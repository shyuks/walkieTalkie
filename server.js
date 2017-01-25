var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var path = require('path')
var database = require('./db/config.js')
var Users = require('./db/schema/User.js')
var ActiveUsers = require('./db/schema/ActiveUsers.js')
var dataHandler = require('./db/data_handler.js')
var port = 3000

var app = express()
module.exports.app = app;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret : "walkienotTalkie",
  resave: false,
  saveUninitialized: true,
  duration : 15 * 60 * 1000,
  activeDuration : 5 * 60 * 1000
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/checkSession', (req, res) => {
  res.status(200).send({id : req.session.userId});
});

app.get('/findGlobalRoom', (req, res) => {
  dataHandler.createSession(req.session.userId, req.query.latitude, req.query.longitude)
  .then(sessionCreated => {
    dataHandler.findGlobalRoom(req.session.userId, (error, result, host) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).json({'host' : host, 'roomId' : result});
      } 
    })
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/findLocalRoom', (req, res) => {
 dataHandler.createSession(req.session.userId, req.query.latitude, req.query.longitude)
 .then(sessionCreated => {
    dataHandler.findLocalRoom(req.session.userId, req.query.latitude, req.query.longitude, (error, result, host, distance) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).json({'host' : host, 'roomId' : result, 'distance' : distance});
      }
    })
 })
 .catch(error => {
   res.status(200).send(error);
 })
})

app.post('/signup', (req, res) => {
  dataHandler.createUser(req.body, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      req.session.userId = result.id;
      res.status(200).json(result);
    }
  })
});

app.post('/login', (req, res) => {
  dataHandler.userLogin(req.body.email, req.body.password, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      req.session.userId = result.id;
      res.status(200).json(result);
    }
  })
});

app.post('/logout', (req, res) => {
  dataHandler.userLogout(req.body.id, error => {
    if (error) {
      res.status(500).send(error);
    } else {
      req.session.destroy();
      res.status(200).send('Logout successfull');
    }
  })
})

app.post('/exitChat', (req, res) => {
  dataHandler.exitRoom(req.body.id, error => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send('Exit Successfull')
    }
  })
})

database.sync()
  .then(res => {
    app.listen(port, function() {
    console.log('Listening On localhost:' + port)
    });
  })
  .catch(error => {
    console.log('Database did not sync: ', error)
  })

