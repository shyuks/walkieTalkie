// Server goes here
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
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/checkSession', (req, res) => {
  res.status(200).send({id : req.session.userId});
});

app.get('/findGlobalRoom', (req, res) => {
  console.log(req.query)
  res.status(200).send()
})

app.get('/findLocalRoom', (req, res) => {
  console.log(req)
  res.status(200).send()
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

