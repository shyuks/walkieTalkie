var db = require('../config.js')
var Sequelize = require('sequelize')

var ActiveUsers = db.define('ActiveUsers', {
  userId : {
    type : Sequelize.INTEGER,
    allowNull : false
  },
  latitude : {
    type : Sequelize.DOUBLE,
    allowNull : false
  },
  longitude : {
    type : Sequelize.DOUBLE,
    allowNull : false
  },
  roomId : {
    type : Sequelize.INTEGER,
    defaultValue : 0
  }
});

module.exports = ActiveUsers;