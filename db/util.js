var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

module.exports.comparePassword = (enteredPassword, savedPassword) => {
  return new Promise ((resolve, reject) => {
    return bcrypt.compare(enteredPassword, savedPassword, (err, isMatch)=>{
      if (err) {
        return reject(err);
      } else {
        return resolve(isMatch);
      }
    })
  })
};

module.exports.cipher = (enteredPassword) => {
  return new Promise ((resolve, reject) => {
    return bcrypt.hash(enteredPassword, null, null, (error, result) => {
      if(error) {
        return reject(error);
      } else {
        return resolve(result);
      }
    })
  })
}

module.exports.distance = (lat1, lon1, lat2, lon2) => {
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
