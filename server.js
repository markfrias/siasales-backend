const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const connectEnsureLogin = require("connect-ensure-login");
const passport = require("passport");
const {v4 : uuidv4} = require("uuid");
const path = require("path");
const User = require("./user.js")

const app = express();
const PORT = 8080

app.listen(PORT, () => console.log(`server is running on port ${PORT}, http://localhost:${PORT}`));

app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({extended : false}));
app.use(session({
    genid: (req) => {
        return uuidv4();
    },
    secret: "&$un-)(*$mot'@#$pour.}@{securiser2@/$Q-notre@(#$projet9($3", //should be saved in an environmental variable
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }  //1hour
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

//use with session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'static/index.html'));
})

app.get('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, 'static/login.html'));
})

app.get('/signup', (req, res) =>{
    res.sendFile(path.join(__dirname, 'static/signup.html'));
})

app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
     and your session expires in ${req.session.cookie.maxAge} 
     milliseconds.<br><br>
     <a href="/logout">Log Out</a><br><br>
     <a href="/secret">Members Only</a>`);
});

app.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendFile(__dirname + '/static/secret-page.html');
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
 });

app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  (req, res) => {
	console.log(req.user)
	res.redirect('/dashboard');
});

app.post('/signup', (req, res) =>{
    let Username = req.body.username;
    let Password = req.body.password;
    User.register({ username: Username, active: false }, Password);
	res.redirect('/dashboard');
})