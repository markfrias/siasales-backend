const express = require('express');
const { restart } = require('nodemon');
const { route } = require('.');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//enter User
const User = require('../models/salesperson');

const router = express.Router();

//login page
router.get('/login', (req, res)  =>{
    res.render('login.ejs')
});

//register page
router.get('/register', (req, res)  =>{
    res.render('register.ejs')
});

//login handler
router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect : '/dashboard', 
        failureRedirect : '/user/login',
        failureFlash: true
    })(req, res, next);
});

//register handler
router.post('/register', (req, res)=>{
    const {firstName, lastName, userName, 
        password, password2, phoneNumber } = req.body;
    let errors = [];
    //check required fields
    if (!firstName || !lastName || !phoneNumber || !userName || !password || !password2){
        errors.push({msg : 'please fill in all fields'})
    }
    //check passwords march
    if( password !== password2){
        errors.push({msg : 'Passswords do not match'})
    }
    //check length of passwords
    if(password.length < 6){
        errors.push({msg : 'password should be at least 6 characters'})
    }
    if(errors.length > 0){
        res.render('register', {errors, firstName, lastName, userName, 
            password, password2, phoneNumber});
    } else {
        //validation passed
        User.findOne({ 
            userName : userName
        })
        .then(user => {
            if(user){
                errors.push({msg : 'Username already used'})
                res.render('register', { errors, firstName, lastName, 
                    password, password2, phoneNumber});
            }
            else{
                const newUser = new User({firstName, lastName, userName, 
                    password, phoneNumber});
                //hash password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //set password to hash
                        newUser.password = hash;

                        //save newUser
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered');
                            res.redirect('/user/login');
                        })
                        .catch(err => console.log(err));
                    })
                );
            }
        })
        .catch(err => console.log(err));
    }
});

//logout handler
router.get('/logout', (req, res) =>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
})
module.exports = router;