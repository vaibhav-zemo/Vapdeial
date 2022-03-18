const express = require('express');
const app = express();
const port = 8000;


app.use('/',require('./routers'));

app.listen(port,function (err) {
    if (err) {
        console.log("Error while creating Server");
        return;
    }
    console.log("Successfully setup the server at port:",port);
})