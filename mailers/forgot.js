const mailer = require('../config/nodemailer');

exports.forgot = (mail) => {
    let htmlString = mailer.renderTemplate({ mail: mail }, '/forgot_mailer.ejs');

    mailer.transporter.sendMail({
        from: 'codieal456@gmail.com',
        to: mail,
        subject: 'Password Reset link',
        html: htmlString,
    }, (err, info) => {
        if (err) {
            console.log("Error while sending rest password mail", err);
            return;
        }

        return;
    });
};