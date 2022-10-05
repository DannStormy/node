const express = require('express');
const router = express.Router();

const companies = require('../controllers/companies.js')

router.get('/companies', companies);

module.exports = router;