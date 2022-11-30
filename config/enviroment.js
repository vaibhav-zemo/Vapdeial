const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
require("dotenv").config();

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory || fs.mkdirSync(logDirectory));

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    assets_path: './assets',
    cookie_key: 'blahsomething',
    db: 'mongodb+srv://vapking:UN7lxXoBwWgRrOGV@cluster0.3llibt4.mongodb.net/?retryWrites=true&w=majority',
    smpt: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'codeial456@gmail.com',
            pass: 'Codeial@2022'
        }
    },
    google_clientID: "493719420537-8cab53nces9kq1i4qefpd2c37nj3jcne.apps.googleusercontent.com",
    google_clientSecret: "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",
    google_callbackURL: "http://localhost:8000/user/auth/google/callback",
    jwt_screat: 'codeial',
    morgan: {
        mode: 'dev',
        options: {
            stream: accessLogStream
        }
    }
}


const production = {
    name: 'production',
    assets_path: process.env.CODEIAL_ASSETS_PATH,
    cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smpt: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD,
        }
    },
    google_clientID: process.env.CODEIAL_GOOGLE_CLIENTID,
    google_clientSecret: process.env.CODEIAL_GOOGLE_CLIENTSECRET,
    google_callbackURL: process.env.CODEIAL_GOOGLE_CALLBACKURL,
    jwt_screat: process.env.CODEIAL_JWT_SCREAT,
    morgan: {
        mode: 'combined',
        options: {
            stream: accessLogStream
        }
    }
}

module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);