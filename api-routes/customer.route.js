const express = require('express');
const customerControllers = require('../controllers/customers.controller');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get("/", ensureAuthenticated, customerControllers.getUsers);
router.post("/", ensureAuthenticated, customerControllers.addUser);
router.get("/s", ensureAuthenticated, customerControllers.getUser);

module.exports = router
