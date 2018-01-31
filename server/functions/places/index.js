const fetch = require('node-fetch');

const GOOGLE_PLACES_API = 'SECRET';
const GOOGLE_PLACES_KEY = 'SECRET';

exports.places = (req, res) => {
  const input = req.body;

  res.header("Access-Control-Allow-Origin", "http://arcules-weather.appspot.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (input === undefined) {
    // This is an error case, as "message" is required.
    res.status(400).send('No message defined!');
  } else {
    url = `${GOOGLE_PLACES_API}/autocomplete/json?input=${input}&types=geocode&language=en&key=${GOOGLE_PLACES_KEY}`;

    fetch(url)
      .then((resp) => {
        return resp.json();
    })
    .then((json) => {
        const data = json.predictions;
      res.status(200).json(data);
    });
  }
};
