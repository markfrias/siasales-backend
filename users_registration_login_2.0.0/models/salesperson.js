const mongoose = require('mongoose')
const {Schema} = mongoose;

const salesPersonSchema = new Schema({
    
    firstName        : {
        type: String,
        required: true
    },   
    lastName         : {
        type: String,
        required: true
    },
    userName         : {
        type: String,
        required: true
    },  
    password         : {
        type: String,
        required: true
    }, 
    phoneNumber      : {
        type: String,
        required: true
    }


})
const SalesPerson = mongoose.model ('SalesPerson', salesPersonSchema)

module.exports = SalesPerson;