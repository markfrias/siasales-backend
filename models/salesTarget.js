const mongoose = require('mongoose')
const {Schema} = mongoose;

const salesTargetSchema = new Schema({
    targetStartDate : {
        type: Date,
        required: true
    },   
    targetEndDate   : {
        type: Date,
        required: true
    },
    targetSalesFigure : { 
        type: Number,
        required: true
    },  
    targetSalesGrowthPercentage : { 
        type: Numbers,
        required: true
    }

})

const SalesTarget = mongoose.model ('SalesTarget', salesTargetSchema)

module.exports = {
    SalesTarget: SalesTarget
}