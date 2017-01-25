var db = require('./config.js')
var Users = require('./schema/User.js')
var ActiveUsers = require('./schema/ActiveUsers.js');
var sequelize = require('sequelize')
var util = require('./util.js')


module.exports.createUser = (nI, cb) => {
  db.query('select id from Users where email = ?',
  {replacements : [nI.email], type : sequelize.QueryTypes.SELECT})
  .then(userFound => {
    if (userFound.length > 0) {
      cb('Email already registered, try logging in');
    } else {
      util.cipher(nI.password)
      .then(hashedPassword => {
        Users.create({email : nI.email, firstname : nI.firstname, lastname : nI.lastname, password : hashedPassword})
        .then(newUser => {
          cb(false, newUser.dataValues);
        })
        .catch(error => {
          cb(error);
        })
      })
      .catch(error => {
        cb(error);
      })
    }
  })
  .catch(error => {
    cb(error);
  })
}

module.exports.userLogin = (email, password, cb) => {
  db.query('select * from Users where email = ?', 
  {replacements : [email], type : sequelize.QueryTypes.SELECT})
  .then(userFound => {
    if (userFound.length === 1) {
      util.comparePassword(password, userFound[0].password)
      .then(match => {
        if (match) {
          cb(false, {id : userFound[0].id});
        } else {
          cb('Password/Email combination did not match');
        }
      })
      .catch(error => {
        cb(error);
      })
    } else {
      cb('User not found');
    }
  })
  .catch(error => {
    cb(error);
  })
}

module.exports.userLogout = (inputId, cb) => {
  db.query('delete from ActiveUsers where userId = ?',
  {replacements : [inputId], type : sequelize.QueryTypes.DELETE})
  .then(result => {
    cb(false);
  })
  .catch(error => {
    console.log('in error', error);
    cb(error);
  })
}

module.exports.exitRoom = (inputId, cb) => {
  console.log(inputId)
  db.query('update ActiveUsers set roomId = 0 where userId = ?', 
  {replacements : [inputId], type : sequelize.QueryTypes.UPDATE})
  .then(result => {
    cb(false);
  })
  .catch(error => {
    cb(error);
  })
}