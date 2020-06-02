const express = require('express');
const router = express.Router();
const documentsCtrl = require('../controllers/documents');

router.get('/documents/new', documentsCtrl.new);
router.post('/documents', documentsCtrl.create);

module.exports = router;