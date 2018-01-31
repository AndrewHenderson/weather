const moment = require('moment');
const fetch = require('node-fetch');
const DARK_SKY_KEY = "SECRET";

exports.weather = (req, res) => {
  try {
    const body = JSON.parse(req.body);
    const { lat, lng, time } = body;
    const promises = [];

    res.header("Access-Control-Allow-Origin", "http://arcules-weather.appspot.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    for (var i = 7; i > 0; i--) {
      var iso = moment(time).subtract(i, 'days').toISOString();
      var timestamp = iso.split('.')[0]+"Z";
      var url = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat},${lng},${timestamp}?exclude=[minutely,hourly]`;
      promises.push(
        fetch(url)
          .then((res) => {
          return res.json()
        })
        .catch(console.log)
      )
    }

    Promise.all(promises).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    next(err)
  }
};

