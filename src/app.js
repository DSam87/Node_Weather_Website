const path = require('path');
const hbs = require('hbs');
const express = require('express');
const { geocode } = require('../utils/geocode');
const { forecast } = require('../utils/forecast.js');

// function that instantiates our app as an object of express.
const app = express();

// port
const port = process.env.PORT || 3000;

// function
const { AsyncResource } = require('async_hooks');
const { hasSubscribers } = require('diagnostics_channel');
const { query } = require('express');

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serv.
app.use(express.static(publicDirectoryPath));

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'This is the help message. Welcome!',
    name: 'Sam Deleon',
  });
});

app.get('/products', (req, res) => {
  res.send({ pruducts: [] });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me', name: 'Sam' });
});

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Sam',
  });
});

app.get('/weather', (req, res) => {
  const queryArguments = req.query;

  if (!queryArguments.address) {
    return res.send({ error: 'You need the location!' });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: 'Could not find location!' });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ message: error });
        }

        return res.send({
          location: location,
          forecast: forecastData,
          address: queryArguments.address,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found.',
    name: 'Sam',
  });
});

app.get('*', (req, res) => {
  res.render('404', { title: '404', message: 'Page not found.', name: 'Sam' });
});

app.listen(port, () => {
  console.log('Server is running on port ' + port + '...');
});
