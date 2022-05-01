const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./enviroment');

let transporter = nodemailer.createTransport(env.smpt);


let renderTemplate = (data,relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function (err,template) {
            if(err){console.log("Error in rendering template"); return;}

            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}