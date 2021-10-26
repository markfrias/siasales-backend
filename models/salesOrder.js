const mongoose = require('mongoose')
const {Schema} = mongoose;

const salesOrderSchema = new Schema({
    date                     : Date, 
    customerId              : {
        type: Number,
        required: true
    },
    customerRepresentativeId : {
        type: Number,
        required: true
    },  
    salesPersonId             : {
        type: Number,
        required: true
    },   
    shippingDetails        : {
        shippingMethod: String,
        shippingVehicle: String,
        shippingDate: Date,
        deliveryDate: Date,
        paymentChoice: String,
        billingStreetAddress: String,
        billingCity: String,
        billingProvince: String,
        shippingStreetAddress: String,
        shippingCity: String,
        shippingProvince: String
        
    },   
    orderDetails           : { 
        discount: Number,
        taxRate: Number,
        otherFees: Number
    },
    status                   :  {
         type:  Boolean    
    ,
    },
    items: [
        {
            itemId: Number,
            itemName: String,
            itemDescription: String,
            quantity: Number,
            unitPrice: Number,

        }
    ]

})


const SalesOrder = mongoose.model('SalesOrder', salesOrderSchema);

module.exports = {
    SalesOrder: SalesOrder
}