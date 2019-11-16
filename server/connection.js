
const mongoose = require('mongoose');

// mongodb setup
mongoose.connect('mongodb://admin:myq85sjt@ds211708.mlab.com:11708/tabtracker',{useNewUrlParser: true, useUnifiedTopology: true});

//mongoose.connect('mongodb://127.0.0.1:27017/auth', {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));