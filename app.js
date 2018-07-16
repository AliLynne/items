const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const connectOptions = { useNewUrlParser: true };

// all routes will be set up in routes file
const routes = require('./routes/routes');

// app is an object that is going to take incoming HTTP requests - and depending on the method and route it's going to run a specific bunch of code
const app = express();

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.DEV_DB_URI, connectOptions);
}

app.use(express.json());
routes(app);

// order of middleware is important

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message })
})

module.exports = app;