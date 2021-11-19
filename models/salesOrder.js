const mongoose = require('mongoose')
const {Schema} = mongoose;

const salesOrderSchema = new Schema({
    // Use timestamp date of creation data for date, instead
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
        shippingFee: Number,
        otherFees: Number
    },
    status                   :  {
         type:  Boolean,
         default: true   
    ,
    },

    processingStatus : {
        type: String,
        default: "Processing"
    },
    items: [
        {
            itemId: {
                type: Number,
                required: true,
            },
            itemName: {
                type: String,
                required: true,
            },
            itemDescription: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            unitPrice: {
                type: Number,
                required: true,
            },
        }
    ]

},
{timestamps: true}
)


const SalesOrder = mongoose.model('SalesOrder', salesOrderSchema);

module.exports = {
    SalesOrder: SalesOrder
}