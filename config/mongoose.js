const mongoose = require('mongoose');
const env = require('./enviroment');

mongoose.connect(`mongodb://54.160.188.10/${env.db}`);
const db = mongoose.connection;

db.on('error',console.error.bind("Error while connecting to mongodb"));
db.once('open',function () {
    console.log("Succesfull Connected to database");
})