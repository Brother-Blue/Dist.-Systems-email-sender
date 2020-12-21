const nodemailer = require('nodemailer');

// nodemailer function for sending email
async function sendMail(emailText) {

    emailMessage = JSON.parse(emailText);
    console.log('Sending email address to:' + emailMessage.emailaddress);
    nodemailer.createTestAccount((err) => {
        if (err) return err;
        // Login to emailer sender
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.SMTP_USER, // Simple mail transport protocol
                pass: process.env.SMTP_PASSWORD
            }
        }, {
            from: 'Dentistimo Registration'
        });
        // Create email payload
        let message = {
            to: `<${emailMessage.emailaddress}>`,
            subject: 'Appointment confirmation',
            text: '', 
            html: `<h3>Hello ${emailMessage.name}! Your appointment:</h3>
                    <p>Date: ${emailMessage.date.substring(0, 10)}</p>
                    <p>Time: ${emailMessage.date.substring(11, 20)}</p>`
        };
        // Send email
        transporter.sendMail(message, (err) => {
            if (err) return err;
            transporter.close();
        });
    });
}

module.exports.sendMail = sendMail;