const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ShippingDetailsSchema = new Schema({
    ShippingDetailsID : Number,
    ShippingMethod    : String,
    ShippingVehicle   : String,
    ShippingDate      : Date,
    DeliveryDate      : Date,
    PaymentChoice     : String,
    BillingStreetAddress  : String,
    BillingCity         : String,
    BillingProvince    : String,
    ShippingStreetAddress : String,
    ShippingCity        : String,
    ShippingProvince    : String


}),

const ShippingDetailsTable = mongoose.model('ShippingDetailsTable', userSchema);

module.exports = {
    ShippingDetailsTable: ShippingDetailsTable
}