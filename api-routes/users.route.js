const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/login', passport.authenticate('local'), usersController.login);
router.post('/register', usersController.register);
router.get('/logout', usersController.logout);

module.exports = router;
