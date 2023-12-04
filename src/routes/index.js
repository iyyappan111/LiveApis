const express = require('express');
const router = express.Router();
const services = require('../services');

router.post('/signUp', services.signUp);
router.post('/signIn', services.signIn);

module.exports = router;
