const express = require('express');
const router = express.Router();

const mailerCtrl = require('../controllers/mailer.controller');

router.post('/', mailerCtrl.transporter);

module.exports = router;