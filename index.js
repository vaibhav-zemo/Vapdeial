const express = require('express');
const env = require('./config/enviroment');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helper')(app);

const port = 8000;
const path = require('path');
const expresslayout = require('express-ejs-layouts');
const mongodb = require('./config/mongoose');
const user = require('./models/user');
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customWare = require('./config/middleware');

// setup the chat sever to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000')

if (env.name == 'development') {
    app.use(sassMiddleware({
        src: path.join(__dirname, env.assets_path,'scss'),
        dest: path.join(__dirname, env.assets_path,'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css',
    }));
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// make the upload path available to the brower
app.use('/upload', express.static(__dirname + '/upload'));


app.use(expresslayout);
app.use(express.static(env.assets_path));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(session({
    name: 'codeial',
    secret: env.cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://54.160.188.10:27017',
            mongooseConnection: mongodb,
            autoRemove: 'disabled'
        }, function (err) {
            console.log(err || 'connect-mongo');
        })
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customWare.setFlash);

app.use('/', require('./routers'));



app.listen(port, function (err) {
    if (err) {
        console.log("Error while creating Server");
        return;
    }
    console.log("Successfully setup the server at port:", port);
})
