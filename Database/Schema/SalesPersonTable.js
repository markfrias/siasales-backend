const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SalePersonSchema = new Schema({
    SalesPersonid    :  {
        type: Number,
        required: true
    },  
    FirstName        : {
        type: String,
        required: true
    },   
    LastName         : {
        type: String,
        required: true
    },
    UserName         : {
        type: String,
        required: true
    },  
    Password         : {
        type: String,
        required: true
    },   
    CompanyID        : {
        type: Number,
        required: true
    }, 
    PhoneNumber      : {
        type: Number,
        required: true
    }


})

// const SalesPersonTable = mongoose.model('SalePersonTable', userSchema);
//const SalesPersonTable = mongoose.model('SalePersonTable', SalePersonSchema);
      

// module.exports = {
//     SalePersonTable: SaleOrderTable
// }
module.exports = mongoose.model ('SalePersonTable', SalePersonSchema)