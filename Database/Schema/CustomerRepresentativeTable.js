const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CustomerRepresentativeSchema = new Schema({
    CustomerRepresentativeID  : {
        type: Number,
        required: true,
    },
    CustomerID                : {
        type: Number,
        required: true,
    },  
    Email                     : {
        type: String,
        required: true,
    },
    Department                : {
        type: String,
        required: true
    },
    PhoneNumber               : {
        type:String,
        required: true
    }, 
    StreetAddress             :  {
        type:String,
        required: true
    },   
    City                      :  {
        type:String,
        required: true
    },
    Province                  : {
        type:String,
        required: true
    }

})

//const CustomerRepresentativeTable = mongoose.model('CustomerRepresentativeTable', userSchema);

module.exports = mongoose.model('CustomerRepresentative', CustomerRepresentativeSchema )
    //CustomerRepresentativeTable: CustomerRepresentativeTable
//}
