var sequelize = require('sequelize')

var User = sequelize.define('User', {
    username: Sequelize.String,
    password: Sequelize.String,
    email: Sequelize.String
},
{
    tableName: 'user_table',
    createdAt: 'date_of_creation'
})


User.create({
    username: 'greg',
    password: 'password',
    email: 'greg@yahoo.com'
})

sequelize.sync()
module.exports = User
