const mongoose = require('mongoose')
const {Schema} = mongoose;

const customerSchema = new Schema({
    streetAdress: {
        type: String,
        required: true
    },    
    city        : {
        type: String,
        required: true
    },    
    province    : {
        type: String,
        required: true
    },    
    emailAddress       : {
        type: String,
        required: true
    },    
    phoneNumber : {
        type: String,
        required: true
    },    
    industry    : {
        type: String,
    },   
    status      : {
        type: Boolean
}
})


const Customer = mongoose.model('Customer', customerSchema);

module.exports = {
    Customer: Customer
}