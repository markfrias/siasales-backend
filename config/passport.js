const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const {SalesPerson} = require('../models/salesperson');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'userName', passwordField : 'password', session: true}, (username, password, done) => {
      // Match user
      //console.log("hello")
      SalesPerson.findOne({
        userName: username
      }).then(user => {
        if (!user) {
          console.log("Not a user")
          return done(null, false, { message: 'That Username is not registered' });
        }
        console.log(user)
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });

        
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    SalesPerson.findById(id, function(err, user) {
      done(err, user);
    });
  });
};