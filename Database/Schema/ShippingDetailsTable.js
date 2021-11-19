const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ShippingDetailsSchema = new Schema({
    ShippingDetailsID : {
        type: Number,
        required: true
    },
    ShippingMethod    : { 
        type: String,
        required: true
    },
    ShippingVehicle   : {
        type: String,
        required: true
    },  
    ShippingDate      : {
        type: Date,
        required: true
    }, 
    DeliveryDate      : {
        type: Date,
        required: true
    },
    PaymentChoice     : {
        type: String,
        required: true
    }, 
    BillingStreetAddress  : {
        type: String,
        required: true
    }, 
    BillingCity         : {
        type: String,
        required: true
    },
    BillingProvince    : { 
        type: String,
        required: true
    },
    ShippingStreetAddress : {
        type: String,
        required: true
    },    
    ShippingCity        : { 
        type: String,
        required: true
    },
    ShippingProvince    : {
        type: String,
        required: true
    }  


})

//const ShippingDetailsTable = mongoose.model('ShippingDetailsTable', userSchema);

module.exports = mongoose.model ("ShippingDetailsTable", ShippingDetailsSchema)
    //ShippingDetailsTable: ShippingDetailsTable
//}