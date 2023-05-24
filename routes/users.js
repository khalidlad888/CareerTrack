//require express and router
const express = require('express');
const router = express.Router();

//import users controller
const usersController = require('../controllers/users_controller');
const passport = require('passport');

//users controller route for sign-in and sign-up
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

//route for creating user in database
router.post('/create', usersController.create);

//route for creating session using passport
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


//route for destroying session
router.get('/sign-out', usersController.destroySession);

//export router
module.exports = router;