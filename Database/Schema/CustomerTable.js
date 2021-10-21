const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CustomerTableSchema = new Schema({
    CustomerId  : {
        type: Number,
        required: true
    },   
    StreetAdress: {
        type: String,
        required: true
    },    
    city        : {
        type: String,
        required: true
    },    
    Province    : {
        type: String,
        required: true
    },    
    Email       : {
        type: String,
        required: true
    },    
    PhoneNumber : {
        type: String,
        required: true
    },    
    Industry    : {
        type: String,
        required: true
    },   
    Status      : {
        type: Boolean
}
})

//const Customertable = mongoose.model('CustomerTable', userSchema);

module.exports = mongoose.mpodel('CustomerTable' , CustomerTableSchema )
    //CustomerTable: CustomerTable
//}