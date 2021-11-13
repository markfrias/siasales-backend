const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//passport config
require('./config/passport')(passport);

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/SIA',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log('mongo db connected...'))
  .catch((err) => console.log(err));

//ejs
app.use(ejsLayouts);
app.set('view engine', 'ejs');

//bodyparser
app.use(express.urlencoded({extended : false}));

//Express Session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
  // cookie: { secure: true }
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//routes
app.use('/', require('./routes/index'));
app.use('/user/', require('./routes/user'));

const PORT = process.env.PORT || 5000;




app.listen(PORT, ()=> console.log(`server is running on port http://localhost:${PORT}`))