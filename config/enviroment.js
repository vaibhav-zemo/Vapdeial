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
    db: 'codeial_development',
    smpt: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'peakyblinders852947@gmail.com',
            pass: 'jpevkdmjeqgnbohj'
        }
    },
    google_clientID: "493719420537-bcuehthlovmo21pvjh3pbbca7l8kbih4.apps.googleusercontent.com",
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

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
