const express = require('express');
const path = require('path');
const mongodb = require('./config/mongoose');
const user = require('./models/user');
const app = express();
const port = 8000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use('/',require('./routers'));


app.listen(port,function (err) {
    if (err) {
        console.log("Error while creating Server");
        return;
    }
    console.log("Successfully setup the server at port:",port);
})