const bcrypt = require('bcryptjs');
const passport = require('passport');

//enter User
const User = require('../models/salesperson');

//login handler
const login = async (req, res)=>{
    passport.authenticate("local", function(err, user, info) {
        if (err) {
          return res.status(404).json(err);
        }
        if (user) {
          res.status(200);
          res.json(user);
        } else {
          res.status(401).json(info);
        }
      })(req, res);
};

//register handler
const register = async (req, res)=>{
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
        res.json({errors, firstName, lastName, userName, phoneNumber});
    } else {
        //validation passed
        User.findOne({ 
            userName : userName
        })
        .then(user => {
            if(user){
                errors.push({msg : 'Username already used'})
                res.json({ errors, firstName, lastName, phoneNumber});
            }
            else{
                const newUser = new User({firstName, lastName, userName, 
                    password, phoneNumber});
                //hash password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;

                        //save newUser
                        newUser.save()
                        .then(user => {
                            res.json('new user saved');
                        })
                        .catch(err => res.status(400).json('Error: ' +err));
                    })
                );
            }
        })
        .catch(err => res.status(400).json('Error: ' +err));
    }
};

//logout handler
const logout = async (req, res) =>{
    req.logout();
    res.json('log out');
};

module.exports = {login, register, logout};