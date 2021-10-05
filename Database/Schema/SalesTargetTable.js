const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SalesTargetSchema = new Schema({
    SalesTargetID  : Number,
    TargetStartDate : Date,
    TargetEndDate   : Date,
    TargetSalesFigure : Number,
    TargetSalesGrowthPercentage : Numbers


}),

const SalesTargetTable = mongoose.model('SaleTargetTable', userSchema);

module.exports = {
    SaleTargetTable: SaleTargetTable
}