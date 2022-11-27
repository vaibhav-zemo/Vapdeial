const mongoose = require('mongoose');
const env = require('./enviroment');

mongoose.connect(`mongodb://0.0.0.0/${env.db}`);
const db = mongoose.connection;

db.on('error',console.error.bind("Error while connecting to mongodb"));
db.once('open',function () {
    console.log("Succesfull Connected to database");
})