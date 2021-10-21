const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CustomerTableSchema = new Schema({
    OrderDetailsID  : {
        type: Number,
        unique: false,
        required: true
    }, 
    Discount        :  {
        type: Number,
        unique: false,
        required: true
    },
    TaxRate         :  {
        type: Number,
        unique: false,
        required: true
    },
    OtherFees   : {
        type: Number,
        Unique: false,
        required: true

    } 

})

//const OrderDetailsTable = mongoose.model('OrderDetails', CustomerTableSchema );

module.exports = mongoose.model('OrderDetails',CustomerTableSchema )
    //OrderDetailsTable: OrderDetailsTable
//}