// Server goes here
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var app = express()
var port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(port, function() {
    console.log('Listening On localhost:' + port)
})
