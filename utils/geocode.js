const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?limit=1&access_token=pk.eyJ1IjoiZHNhbTg3IiwiYSI6ImNremVteGlyOTMwbmkycXBycjh4MWViZGQifQ.qXcueS3QfJ6YfrGftVw_3Q';

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to service.', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location.', undefined);
    } else {
      console.log(response.body);
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = { geocode };
