const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SalesPerson } = require('./models/salesperson');
const { Customer } = require('./models/customer');
var customersRouter = require('./api-routes/customer.route');
var salesOrderRouter = require('./api-routes/salesOrder.route');
const { appendFileSync } = require('fs');
const salesOrder = require('./models/salesOrder');



const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended : false}));



mongoose.connect('mongodb+srv://dbAdmin:Ah%23%21TV6H@cluster0.d1664.mongodb.net/randochatapp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
       
}).then(() => {
    console.log("Connected to DB");
}).catch((error) => console.log(error));


app.listen(8000, () => console.log (`Server is running on port ${8000} ...`));
app.post('/user', (req, res) => {
    let newUser = {
       firstName: "Anthony",
       lastName: "Fauci",
       userName: "afauci",
       password: "2theworldnct",
       phoneNumber: "992-725-4490" 
    }
    SalesPerson.create(newUser, (err, small) => {
        if (err) return res.json({message: err, status: "Error"});
        res.json({message: "Account saved", status: "Success"})
    })
    
});

// Routes
app.use('/customers', customersRouter);
app.use('/customer', customersRouter);
app.use('/salesorder', salesOrderRouter);
