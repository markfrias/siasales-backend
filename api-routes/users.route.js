const dotenv = require('dotenv').config()
const express = require('express');
const {auth} = require('../controllers/jwt.controller')


const passport = require('passport');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/login', passport.authenticate('local'), usersController.login);
router.post('/signin', usersController.signin);
router.post('/register', usersController.register);
router.get('/logout', usersController.logout);

module.exports = router;
