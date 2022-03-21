const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const path = require('path');
const expresslayout = require('express-ejs-layouts');
const mongodb = require('./config/mongoose');
const user = require('./models/user');
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expresslayout);
app.use(express.static('assets'));
app.use(express.urlencoded());
app.use(cookieParser());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:  MongoStore.create(
    {
        mongoUrl:'mongodb://localhost:27017',
        mongooseConnection: mongodb,
        autoRemove: 'disabled'
    }, function (err) {
        console.log(err || 'connect-mongo');
    })
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


app.use('/', require('./routers'));



app.listen(port, function (err) {
    if (err) {
        console.log("Error while creating Server");
        return;
    }
    console.log("Successfully setup the server at port:", port);
})