const { fetchMyIP,fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });
// const myIp ='24.36.166.86';
const fakeIp ='42'

fetchCoordsByIP(fakeIp,(error, data) => {

  if (error) {
        console.log("It didn't work!" , error);
        return;
      }
    
  console.log('It worked! Returned Coords are:' , data);

  });