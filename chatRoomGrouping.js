var database = require('./db/database.js');
var sequelize = require('sequelize');
var sampleData = require('./db/sampleLocationData.json');
var user = 67;

function distance(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	return dist
}
var currDistance = 10000;
var shortestPoint;

function globalChat(inputId, cb) {
  database.db.query('select roomId from ActiveUsers where roomId != 0 group by roomId having count(roomId) < 10', 
    {type : sequelize.QueryTypes.SELECT})
    .then(res1 => {
      if (res1.length === 0) {
        database.db.query('select max(roomId) from ActiveUsers',
        {type : sequelize.QueryTypes.SELECT})
        .then(res2 => {
          database.db.query('update ActiveUsers set roomId = ? where userId = ?',
          {replacements : [res2[0]['max(roomId)']+1, inputId], type : sequelize.QueryTypes.UPDATE})
          .then(res3 => {
            console.log(res3);
            cb(false, res3, res2[0]['max(roomId)']+1);
          })
          .catch(error => {
            console.log('error incrementing roomId when no rooms under 10 found', error);
            cb(error);
          })
        })
        .catch(error => {
          console.log('error getting max id', error);
          cb(error);
        })
      } else {
        database.db.query('update ActiveUsers set roomId = ? where userId = ?',
        {replacements : [ res1[0].roomId, inputId], type : sequelize.QueryTypes.UPDATE})
        .then(res4 => {
          cb(false, res4, res1[0].roomId)
        })
        .catch(error => {
          cb(error);
        })
      }
     })
    .catch(err => {
      console.log('error', err);
    })
};

function callback(error, result, room) {
  if(error){
    console.log(error);
  } else {
    console.log(`User inserted into room ${room}: ${result}`);
  }
}

function localCallback(error, result, room, host, distance){
  if (error) {
    console.log('error joining local chat: ', error);
  } else if (host) {
    console.log(`No rooms avialablle, created new room ${room}, waiting for others to join`);
  } else {
    console.log(`Joined room ${room}, member is ${distance} miles away.`);
  }
}

function localChat(user, lat, long, cb) {
  database.db.query('select roomId from ActiveUsers where roomId != 0 group by roomId having count(roomId) < 10',
   {type : sequelize.QueryTypes.SELECT})
   .then(res1 => {
     if (res1.length === 0) {
        database.db.query('select max(roomId) from ActiveUsers',
        {type : sequelize.QueryTypes.SELECT})
        .then(res2 => {
          database.db.query('update ActiveUsers set roomId = ? where userId = ?',
          {replacements : [res2[0]['max(roomId)']+1, user], type : sequelize.QueryTypes.UPDATE})
          .then(res3 => {
            console.log(res3);
            cb(false, res3, res2[0]['max(roomId)']+1, true);
          })
          .catch(error => {
            console.log('error incrementing roomId when no rooms under 10 found', error);
            cb(error);
          })
        })
        .catch(error => {
          console.log('error getting max id', error);
          cb(error);
        })
     } else {
       var roomsIds = [];
       res1.forEach(id => {roomsIds.push(id['roomId'])});
       database.db.query('select latitude, longitude, roomId from ActiveUsers where roomId in (?)',
        {replacements : [roomsIds], type : sequelize.QueryTypes.SELECT})
        .then(res4 => {
          for(var i = 0; i <res4.length; i++){
            var temp = distance(lat, long, res4[i]['latitude'], res4[i]['longitude']);
            if(temp < currDistance) {
              currDistance = temp;
              shortestPoint = res4[i]['roomId'];
            }
          }
          database.db.query('update ActiveUsers set roomId = ? where userId = ?',
          {replacements : [shortestPoint, user], type : sequelize.QueryTypes.UPDATE})
          .then(res5 => {
            cb(false, res5, shortestPoint, false, currDistance);
          })
          .catch(error => {
            console.log('error updating room to roomdId of closest user found: ', error);
            cb(error);
          })
        })
        .catch(error => {
          console.log('Error selecting locations of users in open rooms');
          cb(error);
        })
     }
   })
   .catch(error => {
     cb(error);
   })
};
// globalChat(user, callback);
 localChat(user+1, sampleData[user]['latitude'], sampleData[user]['longitude'], localCallback);