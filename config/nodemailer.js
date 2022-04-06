const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service:'google',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user: 'codeial456@gmail.com',
        pass: 'Codeial@2022'
    }
});


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