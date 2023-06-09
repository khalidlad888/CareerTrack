const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

//console log to check if router loaded or not
console.log('Router is loaded')

//route for home_controller
router.get('/', homeController.home);
//require users route
router.use('/users', require('./users'));
//require student route
router.use('/students', require('./students'));
//require interview route
router.use('/interview', require('./interview'));


//Exporting router to use
module.exports = router;