const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://khalidlad888:khalid12345@cluster0.gwmv7nt.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('Error', console.error.bind(console, 'Error in connecting to database'));

db.once('open', function () {
    console.log("Connection to MongoDB successful");
});

module.exports = db;