
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {
    if (error) return callback(error,null);
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const ip = JSON.parse(body);
    callback(error,ip);
  });
};

const fetchCoordsByIP = (ip,callback) =>{
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) return callback(error,null);

    const data = JSON.parse(body);
    if (!data.success){
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    } 
    const { latitude, longitude } = data;
    callback(error,{latitude,longitude});
  })
}

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
 const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) return callback(error,null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode}  when fetching for ISS fly over times`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
  
    callback(error,data.response);
  })
};


module.exports = { fetchMyIP,fetchCoordsByIP,fetchISSFlyOverTimes };