const { timeStamp } = require('console');
const mongoose = require('mongoose');

//creating employee database schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

//exporting employee database schema
const User = mongoose.model('User', userSchema);
module.exports = User;