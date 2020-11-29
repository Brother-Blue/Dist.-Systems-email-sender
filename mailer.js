const nodemailer = require('nodemailer');

async function sendMail(emailAddress, emailText) {
    console.log('Sending email address to:' + emailAddress);
    console.log(process.env.SMTP_USER);
    console.log(process.env.SMTP_PASSWORD);

    nodemailer.createTestAccount((err) => {
        if (err) return console.error(error);

        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        }, {
            from: 'ROOT Registration'
        });
    
        let message = {
            to: `<${emailAddress}>`,
            subject: 'Appointment confirmation',
            text: '', 
            html: `<p>${emailText}</p>`
        };

        transporter.sendMail(message, (err) => {
            if (err) return console.error(err);
            transporter.close();
        });
    });
}

module.exports.sendMail = sendMail;