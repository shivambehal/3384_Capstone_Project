'use strict';

// Host
const PORT = '8080';
const HOST = '0.0.0.0';
// App constraints
const express = require('express');
const helmet = require('helmet');
const pug = require('pug');
const path = require('path')

// App
const app = express();
app.set('views', './views')
app.set('view engine', 'pug');

// Static files 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/@popperjs/dist/esm')))

// Web Server
// This disables the `contentSecurityPolicy` middleware but keeps the rest.
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Root Directory
app.get('/', function (req, res) {
  res.render('pages/index')
});

// Help Directory
app.get('/help', function (req, res) {
  res.render('pages/help')
});
// About Directory
app.get('/about', function (req, res) {
  res.render('pages/about')
});

// Error Handling
// 404
app.use(function (req, res, next) {
  res.status(404).render("error/404")
})
// 500
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).render('error/500')
  res.send('500 Server Error')
})

// Start
//parag
app.listen(PORT, HOST);
console.log(`Priv.Cloud is alive at http://${HOST}:${PORT}!`);
