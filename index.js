//requiring express
const express = require('express');
const port = 8000;
const app = express();

//importing library cookie parser for authentication
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Importing mongoose databaase
const db = require('./config/mongoose');

//import session library and passport
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//import connect-mongo to store the cookies in dataabase
const MongoStore = require('connect-mongo')(session);

//Use express static to access assts
app.use(express.static('./assets'));

//Use library express-ejs-layouts
const expresslayouts = require('express-ejs-layouts');
app.use(expresslayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setting view engine using ejs template
app.set('view engine', 'ejs');
app.set('views', './views');

//setup passport session
app.use(session({
    name: 'CareerTrack',
    secret: 'blahblahblah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    //using connect-mongo@3
    store: new MongoStore (
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || "Connect-mobgodb setup Ok");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session())

app.use(passport.setAuthenticatedUser);

//using express router form routes folder
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log(`Server is up and running on port: ${port}`);
});