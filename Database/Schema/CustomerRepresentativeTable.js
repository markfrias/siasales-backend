const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CustomerRepresentativeSchema = new Schema({
    CustomerRepresentativeID  : Number,
    CustomerID                : Number,
    Email                     : String,
    Department                : String,
    PhoneNumber               : String,
    StreetAddress             : String,
    City                      : String,
    Province                  : String

}),

const CustomerRepresentativeTable = mongoose.model('CustomerRepresentativeTable', userSchema);

module.exports = {
    CustomerRepresentativeTable: CustomerRepresentativeTable
}