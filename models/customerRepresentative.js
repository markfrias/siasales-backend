const mongoose = require('mongoose')
const {Schema} = mongoose;

const customerRepresentativeSchema = new Schema({
    customerId                : {
        type: Number,
        required: true,
    },  
    emailAddress                     : {
        type: String,
        required: true,
    },
    department                : {
        type: String,
        required: true
    },
    phoneNumber               : {
        type:String,
        required: true
    }, 
    streetAddress             :  {
        type:String,
        required: true
    },   
    city                      :  {
        type:String,
        required: true
    },
    province                  : {
        type:String,
        required: true
    }

})

const CustomerRepresentative = mongoose.model('CustomerRepresentative', customerRepresentativeSchema);

module.exports = {
    CustomerRepresentative: CustomerRepresentative
}
