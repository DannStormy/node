const express = require('express');
const router = express.Router();

const companies = require('../controllers/companies.js')

router.get('/companies', companies.fetchAllComp);
router.get('/:id', companies.getOneComp);
router.post('/', companies.postComp);
router.patch('/:id', companies.patchComp);
router.delete('/:id', companies.deleteOneComp);

module.exports = router;