const nodemailer = require('nodemailer');
const { config } = require('../config/index');
module.exports = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 465,
      secure: true,
      auth: {
        user: config.MAILER_USER,
        pass: config.MAILER_PASS,
      },
    });

    await transporter.sendConfirmation({
      from: process.env.MAILER_USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('email sent successfully');
  } catch (error) {
    console.log('email not sent!');
    console.log(error);
    return error;
  }
};
