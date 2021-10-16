const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SalePersonSchema = new Schema({
    SalesPersonid    : Number,
    FirstName        : String,
    LastName         : String,
    UserName         : String,
    Password         : String,
    CompanyID        : Number,
    PhoneNumber      : Number,


}),

// const SalesPersonTable = mongoose.model('SalePersonTable', userSchema);
const SalesPersonTable = mongoose.model('SalePersonTable', SalePersonSchema);
      

module.exports = {
//     SalePersonTable: SaleOrderTable
    SalePersonTable: SalePersonTable
}
