/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

// use request to fetch IP address from JSON API
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
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    } 
    const { latitude, longitude } = data;
    callback(error,{latitude,longitude});
  })
}

module.exports = { fetchMyIP,fetchCoordsByIP };