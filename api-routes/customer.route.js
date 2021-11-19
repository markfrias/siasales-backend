const express = require('express');
const customerControllers = require('../controllers/customers.controller');
const router = express.Router();

router.get("/", customerControllers.getUsers);
router.post("/", customerControllers.addUser);
router.get("/s", customerControllers.getUser);

module.exports = router