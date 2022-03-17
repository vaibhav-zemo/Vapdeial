const express = require('express');
const port = 8000;

const app = express();

app.listen(port,function (err) {
    if (err) {
        console.log("Error while creating Server");
        return;
    }
    console.log("Successfully setup the server at port:",port);
})