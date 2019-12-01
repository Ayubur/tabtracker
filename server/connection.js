const mongoose = require('mongoose');
const config = require('./config');

// mongodb setup
mongoose.connect(config.database,{useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));