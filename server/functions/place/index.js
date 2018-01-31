const fetch = require('node-fetch');

const GOOGLE_PLACES_API = 'SECRET';
const GOOGLE_PLACES_KEY = 'SECRET';

exports.place = (req, res) => {
  const placeId = req.body;

  res.header("Access-Control-Allow-Origin", "http://arcules-weather.appspot.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (placeId === undefined) {
    // This is an error case, as "message" is required.
    res.status(400).send('No place id defined!');
  } else {
    const url = `${GOOGLE_PLACES_API}/details/json?placeid=${placeId}&language=en&key=${GOOGLE_PLACES_KEY}`;

    fetch(url, {
      'Content-Type': 'text/json',
    })
      .then((resp) => {
      return resp.json();
    })
    .then((json) => {
        res.send(json);
    })
    .catch((err) => {
        console.log(err);
    });
  }
};