const nodemailer = require('nodemailer');
const { config } = require('../config/index');
const Contact = require('../models/contact');

exports.transporter = async (req, res) => {
  const { name,  email, phone, message } = req.body;
  const newContact = new Contact({
    name,
    email,
    phone,
    message,
  });
  const contactSaved = await newContact.save();

  contentHTML = `
        <h1>Mensaje de contacto desde Rueda de prensa HHC</h1>
        <ul>
            <li>Nombre: ${name}</li>
            <li>Email: ${email}</li>
            <li>Teléfono: ${phone}</li>
            <li>Mensaje: ${message}</li>
        </ul>
    `;

  var transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com', // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: 'SSLv3',
    },
    auth: {
      user: config.MAILER_USER,
      pass: config.MAILER_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: config.MAILER_USER,
    to: "armandoboyzo@go-pharma.mx",
    subject: "Mensaje de contacto desde Rueda de prensa HHC",
    html: contentHTML,
  });

  console.log('Message sent: %s', info.messageId);

  res.status(201).json(contactSaved);
};
