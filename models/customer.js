const mongoose = require('mongoose')
const {Schema} = mongoose;

const customerSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    streetAddress: {
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
    },
    
}, {timestamps: true})


const Customer = mongoose.model('Customer', customerSchema);

module.exports = {
    Customer: Customer
}