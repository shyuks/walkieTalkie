var sampleData = require('./sampleLocationData.json');
var db = require('./schema/ActiveUsers.js');

db.destroy({truncate : true})
  .then(res => {
    for (var i = 0; i < 100; i++) {
      db.create({
        userId : i+1,
        latitude : sampleData[i].latitude,
        longitude : sampleData[i].longitude
      })
    };
  })
