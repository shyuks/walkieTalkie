var sampleData = require('./sampleLocationData.json');
var db = require('./schema/ActiveUsers.js');


db.destroy({truncate : true})
  .then(res => {
    for (var i = 0; i < 100; i++) {
      let room = Math.floor(Math.random() * 20) + 1
      db.create({
        userId : i+100,
        latitude : sampleData[i].latitude,
        longitude : sampleData[i].longitude,
        roomId : room
      })
    };
  })
