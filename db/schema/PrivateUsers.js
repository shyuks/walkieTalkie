var db = require('../config.js')
var Sequelize = require('sequelize')

var PrivateUsers = db.define('PrivateUsers', {
  userId : {
    type : Sequelize.INTEGER,
    allowNull : false
  },
  roomId : {
    type : Sequelize.INTEGER,
    defaultValue : 0
  }
});

module.exports = PrivateUsers;