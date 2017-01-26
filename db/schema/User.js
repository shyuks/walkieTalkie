var db = require('../config.js')
var Sequelize = require('sequelize')

var Users = db.define('Users', {
  email : {
    type : Sequelize.STRING,
    allowNull : false,
    uniqueValue : true
  },
  firstname : {
    type : Sequelize.STRING,
    allowNull : false
  },
  lastname : {
    type : Sequelize.STRING,
    allowNull : false
  },
  password : {
    type : Sequelize.STRING,
    allowNull : false
  }
});


module.exports = Users;

