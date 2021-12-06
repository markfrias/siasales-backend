const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {authenticate} = require('../controllers/jwt.controller');

//enter User
const { SalesPerson } = require('../models/salesperson');

//login handler
const login =  (req, res)=>{
    res.json({message: "Login successful", status: "Success"})
};

// jwt login handler
const signin = (req, res) => {
    let token = jwt.sign({ sub: req.body.userName }, /*process.env.JWT_SECRET*/ "height", { expiresIn: 3600 });
    authenticate(req.body, res, token)
    
}

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
        res.json({errors, firstName, lastName, userName, phoneNumber, status: "Missing credentials or wrong input"});
    } else {
        //validation passed
        SalesPerson.findOne({ 
            userName : userName
        })
        .then(user => {
            if(user){
                errors.push({msg : 'Username already used'})
                res.json({ errors, firstName, lastName, phoneNumber, status: "Username already used"});
            }
            else{
                const newUser = new SalesPerson({firstName, lastName, userName, 
                    password, phoneNumber});
                //hash password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;

                        //save newUser
                        newUser.save()
                        .then(user => {
                            res.json({status: "Success"});
                        })
                        .catch(err => res.status(400).json({error: err, status: "Error"}));
                    })
                );
            }
        })
        .catch(err => res.status(400).json({error:  err, status: "Error"}));
    }
};

//logout handler
const logout = async (req, res) =>{
    req.logout();
    res.json('log out');
};

module.exports = {login, register, logout, signin};
