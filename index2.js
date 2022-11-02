const {nextISSTimesForMyLocation} = require('./iss_promised');
const {printPassTimes} = require('./functions');

nextISSTimesForMyLocation()
  .then(printPassTimes)
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });