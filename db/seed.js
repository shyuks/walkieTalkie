var sampleData = require('./sampleLocationData.json');
var Au = require('./schema/ActiveUsers.js');
var i = require('./schema/Interests.js');


// Au.destroy({truncate : true})
//   .then(res => {
//     for (var i = 0; i < 100; i++) {
//       let room = Math.floor(Math.random() * 20) + 1
//       Au.create({
//         userId : i+100,
//         latitude : sampleData[i].latitude,
//         longitude : sampleData[i].longitude,
//         roomId : room
//       })
//     };
//   })

// var iI = [
//   'Soccer', 'Basketball', 'Football', 'Baseball', 'Hockey', 
//   'Beer', 'Wine', 'Tequila', 'Vodka', 'Whiskey', 'Shopping', 'Shoes', 'Style',
//   'Country', 'Hiphop', 'RnB', 'Jazz', 'EDM', 'Classical', 'Rock', 
//   'Java', 'C', 'Node', 'Ruby', 'Javascript', 'Photography'
// ];

// iI.forEach(int => {
//   i.create({
//     interest : int
//   })
// })
