var express = require('express');
var router = express.Router();
const foundersCtrl = require('../controllers/founders');

/* GET users listing. */
router.get('/', foundersCtrl.index);
module.exports = router;
