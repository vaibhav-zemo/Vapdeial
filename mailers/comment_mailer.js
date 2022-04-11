const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    // console.log("Inside newComment mailer");
    // console.log(comment);
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comment/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'codieal456@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log("Error in sending mail",err);
            return;
        }

        console.log("************************Message Sent", info);
        return;
    });
};