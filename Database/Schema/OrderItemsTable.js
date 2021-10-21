const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OrderItemsTable = new Schema({
    SalesOrderID    : {
        type: Number,
        required: true
    },
    ItemID          : {
        type: Number,
        required: true 
    },  
    Quantity        : {
        type: Number,
        required: true
    },
    UnitPrice       : {
        type: Number,
        required: true
    } 


})

//const OrderItemsTable = mongoose.model('OrderItemsTable', userSchema);

module.exports =  mongoose.model('OrderItemsTable' , OrderItemsTable)
