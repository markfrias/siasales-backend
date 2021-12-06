const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SalesPerson } = require("../models/salesperson");
const bcrypt = require('bcrypt');
const cors = require('cors');


// Use authorization middleware with routes that need to be protected
const auth = function (req, res, next) {

    try {
        if (req.headers.authorization.slice(0, 6) !== "Bearer") {
            console.log("Error")
            req.user = null;
            return res.status(401).send("Unauthorized");

        }
    } catch (err) {
        console.log("Noeee")
        req.user = null;
        return res.status(401).send("Unauthorized");


    }


    let jwtoken = req.headers.authorization.slice(7);

    jwt.verify(jwtoken, process.env.JWT_SECRET, (err, decoded) => {
        if (err){
            console.log(err)
            return res.status(401).send("Incorrect credentials");
        } 



        SalesPerson.findOne({ userName: decoded.sub }, (err, docs) => {
            if (err) {
                console.log(err)
                return res.status(401).send("Incorrect credentials");

            } 
            req.user = docs;
            next();


        })
    });
}

// Authenticate function
function authenticate(requestBody, res, token) {
    SalesPerson.findOne({ userName: requestBody.userName }, (err, user) => {
        console.log(requestBody.userName, requestBody.password)

        // Execute if user does not exist
        if (user === null) {
            console.log("sad")
            res.status(401).send("Incorrect credentials");


            // Execute if the credentials match an existing user
        } else {

            // Execute if the password is incorrect
            bcrypt.compare(requestBody.password, user.password, function (err, result) {
                if (result) {

                    return res.json({ jwt: "Bearer " + token, status: "Success", userName: requestBody.userName });
                }
                res.status(401).send("Incorrect credentials");

            });

        }
    }
    )
}

module.exports = {
    auth, authenticate
}