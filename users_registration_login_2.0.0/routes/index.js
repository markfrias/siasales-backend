const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');



//home page
router.get('/', (req, res)  =>{
    res.render('home.ejs')
});

//dashboard
router.get('/dashboard', ensureAuthenticated, (req, res)  =>{
    res.render('dashboard.ejs', { user : req.user})
});

module.exports = router;