const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SalesOrderSchema = new Schema({
    SalesOrderid             : Number, 
    date                     : date, 
    Customeid                : Number,
    CustomerRepresentativeid : Number,
    SalePersonid             : Number,
    ShippingDetailsid        : Number,
    OrderDetailsid           : Number,
    Status                   : Boolean,
    
}),

const SalesOrderTable = mongoose.model('SaleOrderTable', userSchema);

module.exports = {
    SaleOrderTable: SaleOrderTable
}