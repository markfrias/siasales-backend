const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CustomerTableSchema = new Schema({
    OrderDetailsID  :  Number,
    Discount        :  Number,
    TaxRate         :  Number,
    OtherFees       :  Number

}),

const OrderDetailsTable = mongoose.model('OrderDetailsTable', userSchema);

module.exports = {
    OrderDetailsTable: OrderDetailsTable
}