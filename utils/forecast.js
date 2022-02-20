const request = require('request');

const forecast = (lat, long, callback) => {
  const data = {
    latitude: lat,
    longetude: long,
  };

  const url = `http://api.weatherstack.com/current?access_key=ae41aff4d36b5fd5047426baa0dae099&query=${data.latitude},${data.longetude}`;
  request({ json: true, url }, (error, { body }) => {
    const f = (body.current.temperature * 9) / 5 + 32;

    if (error) {
      callback('Could not connect to service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `The wether: ${body.current.weather_descriptions[0]}. The temp is ${f} degrees fahrenheit.`
      );
    }
  });
};

module.exports = { forecast };
