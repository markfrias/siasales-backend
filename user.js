const mongoose = require("mongoose");
const passportLoccalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/users',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const User = new Schema({
    username: String,
    password: String
}, 
{
  collection: 'User'
});


User.plugin(passportLoccalMongoose);

// User.register({ username: 'candy', active: false }, 'cane');
// User.register({ username: 'starbuck', active: false }, 'redeye');

module.exports = mongoose.model('userData', User, 'userData');

