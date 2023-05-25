const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/careertrack_database');

const db = mongoose.connection;

db.on('Error', console.error.bind(console, 'Error in connecting to database'));

db.once('open', function () {
    console.log("Connection to MongoDB successful");
});

module.exports = db;