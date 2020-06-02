const express = require('express');
const router = express.Router();
const documentCtrl = require('../controllers/documents');

router.get('/documents/new', documentCtrl.new);

module.exports = router;