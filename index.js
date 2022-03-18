const express = require('express');
const path = require('path');
const expresslayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const mongodb = require('./config/mongoose');
const user = require('./models/user');


const app = express();
const port = 8000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(expresslayout);
app.use(express.static('assets'));
app.use(express.urlencoded());
app.use(cookieParser());
app.use('/',require('./routers'));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.listen(port,function (err) {
    if (err) {
        console.log("Error while creating Server");
        return;
    }
    console.log("Successfully setup the server at port:",port);
})