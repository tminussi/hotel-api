var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/hotel-api';

mongoose.connect(dburl);

mongoose.connection.on('connected', function () {
   console.log('Mongoose has successfully connected to the DB ' + dburl);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose has disconnected from ' + dburl);
});

mongoose.connection.on('disconnected', function (err) {
    console.log('There was an error: ' + dburl);
});

process.on('SIGNINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination (SIGNINT)');
        process.exit(0);
    });
});

require('./hotels.model');

