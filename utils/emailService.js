const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = require('./config');

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });

        const mailOptions = {
            from: EMAIL_USER,
            to,
            subject,
            text
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
    } catch (error) {
        console.log('Error sending email:', error);
    }
}

module.exports = {
    sendEmail
}