const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SalesTargetSchema = new Schema({
    SalesTargetID  : {
        type: Number,
        required: true
    },
    TargetStartDate : {
        type: Date,
        required: true
    },   
    TargetEndDate   : {
        type: Date,
        required: true
    },
    TargetSalesFigure : { 
        type: Number,
        required: true
    },  
    TargetSalesGrowthPercentage : { 
        type: Numbers,
        required: true
    }

})

//const SalesTargetTable = mongoose.model('SaleTargetTable', userSchema);

module.exports = mongoose.model ('SalesTargetTable', SalesTargetSchema)
    //SaleTargetTable: SaleTargetTable
//}