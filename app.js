const express = require('express');
const app = express();
const rootRouter = require('express').Router();
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
  if (err.status === 404) res.status(err.status).send({message: err.message})
  if (err.status === 400) res.status(err.status).send({message: err.message})
  if (err.name === "TypeError") res.status(400).send({message: `Bad Request: ${err}`})
  if (err.name === "CastError") res.status(400).send({message: `Bad Request: ${err.value} is an invalid ID`})
  if (err.name === "ValidationError") res.status(400).send({message: `Bad Request: a required field is missing!`})
});

module.exports = app;
