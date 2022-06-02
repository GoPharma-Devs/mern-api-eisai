const nodemailer = require('nodemailer');
const { config } = require('../config/index');
const Contact = require('../models/contact');

exports.transporter = async (req, res) => {
  const { firstname, lastname, email, phone, message } = req.body;
  const newContact = new Contact({
    firstname,
    lastname,
    email,
    phone,
    message,
  });
  const contactSaved = await newContact.save();

  contentHTML = `
        <h1>Form Info</h1>
        <ul>
            <li>Nombre: ${firstname}</li>
            <li>Apellido: ${lastname}</li>
            <li>Email: ${email}</li>
            <li>Teléfono: ${phone}</li>
            <li>Mensaje: ${message}</li>
        </ul>
    `;

  let transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true,
    auth: {
      user: config.MAILER_USER,
      pass: config.MAILER_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: config.MAILER_USER,
    to: config.MAILER_USER,
    subject: req.body.subject,
    html: contentHTML,
  });

  console.log('Message sent: %s', info.messageId);

  res.status(201).json(contactSaved);
};
