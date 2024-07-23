const express = require('express');
const app = express();
const guestsRouter = require('./Routers/guestsRoutes');
const authRouter = require('./Routers/authRoutes');
const jobListingRouter = require('./Routers/jobListingRoutes');
const cors = require('cors');

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Allows incoming requests from any IP
app.use(cors());

//Access public files 
app.use('/public/files', express.static('public/files'));

//ROUTERS 
app.use('/api', guestsRouter);
app.use('/api', authRouter);
app.use('/api/jobs', jobListingRouter);

module.exports = app;