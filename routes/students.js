const express = require('express');
const router = express.Router();
const passport = require('passport');

const studentsController = require('../controllers/students_controller');

router.post('/create',passport.checkAuthentication, studentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, studentsController.destroy);
router.get('/download', passport.checkAuthentication, studentsController.download);

module.exports = router;