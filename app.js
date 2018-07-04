const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const {apiRouter} = require('./routes/apiRouter');
const {DB_URL} = require('./config');

app.use(bodyparser.json());
// app.use(express.static('public'));

app.use('/api', apiRouter);

mongoose.connect(DB_URL).then(() => {
  console.log(`Connection to mongoose is live on ${DB_URL}`);
});

// Error Handling (for now);

app.use('/*', (req, res) => {
  res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
  res.status(500).send({err});
});

module.exports = app;
