const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OrderItemsTable = new Schema({
    SalesOrderID    : Number,
    ItemID          : Number,
    Quantity        : Number,
    UnitPrice       : Number


}),

const OrderItemsTable = mongoose.model('OrderItemsTable', userSchema);

module.exports = {
    OrderItemsTable: OrderItemsTable
}