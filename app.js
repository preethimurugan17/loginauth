var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


var config = require('./config/database');
config.connectDB();

// setting up the express application
app.use(morgan('dev')); // logs every request to the console
app.use(cookieParser()); // reads the headers and parses the cookies and stores the cookies in req.cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// middleware that is required for passport

app.use(session({ secret: 'ilovedogsanddogsloveme',
                saveUninitialized :true,
                 resave : true })); // set session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(flash()); // use connect-flash for flash messages stored in session

// define all the routes here
require('./config/passport')(passport);
require('./models/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

















app.listen(3001);
console.log('server listening on 3001');