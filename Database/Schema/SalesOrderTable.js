const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SalesOrderSchema = new Schema({
    SalesOrderid             : {
            type : Number, 
            required : true
    },
    date                     : date, 
    Customeid                : {
        type: Number,
        required: true
    },
    CustomerRepresentativeid : {
        type: Number,
        required: true
    },  
    SalePersonid             : {
        type: Number,
        required: true
    },   
    ShippingDetailsid        : {
        type: Number,
        required: true
    },   
    OrderDetailsid           : { 
        type: Number,
        required: true
    },
    Status                   :  {
         type:  Boolean,
         required: true
    
}

})

//const SalesOrderTable = mongoose.model('SaleOrderTable', userSchema);

module.exports = mongoose.model ('SaleOrderTable', SaleOrderTableSchema)