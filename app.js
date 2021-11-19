const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { appendFileSync } = require('fs');
const passport = require('passport');
const session = require('express-session');

const customersRouter = require('./api-routes/customer.route');
const salesOrderRouter = require('./api-routes/salesOrder.route');
const usersRouter = require('./api-routes/users.route');

const app = express();

//passport config
require('./config/passport')(passport);

//middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended : false}));

//connection to db
mongoose.connect('mongodb+srv://dbAdmin:Ah%23%21TV6H@cluster0.d1664.mongodb.net/randochatapp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to DB");
}).catch((error) => console.log(error));

//Express Session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false}
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/customers', customersRouter);
app.use('/customer', customersRouter);
app.use('/salesorder', salesOrderRouter);
app.use('/users/', usersRouter);


//start the server
app.listen(8000, () => console.log (`Server is running on port ${8000} ...`));
