const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codiel_2');
const db = mongoose.connection;

db.on('error',console.error.bind("Error while connecting to mongodb"));
db.once('open',function () {
    console.log("Succesfull Connected to database");
})