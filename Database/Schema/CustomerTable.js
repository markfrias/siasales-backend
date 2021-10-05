const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CustomerTableSchema = new Schema({
    CustomerId: Number,
    StreetAdress: String,
    city        : String,
    Province    : String,
    Email       : String,
    PhoneNumber : String,
    Industry    : String,
    Status      : Boolean
}),

const Customertable = mongoose.model('CustomerTable', userSchema);

module.exports = {
    CustomerTable: CustomerTable
}