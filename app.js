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
  if (err.status === 404) res.status(404).send({message: `${err.message}`})
  if (err.name === "CastError") res.status(400).send({message: `Bad Request: ${err.value} is an invalid ID`})
  if (err.name === "ValidationError") res.status(400).send({message: `Bad Request: ${err.errors.name.path} is required!`});
  else res.status(500).send({err});
});

module.exports = app;
