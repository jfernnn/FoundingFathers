var express = require('express');
var router = express.Router();
const foundersCtrl = require('../controllers/founders');

/* GET users listing. */
router.get('/', foundersCtrl.index);
router.get('/new', foundersCtrl.new);
router.post('/', foundersCtrl.create)

module.exports = router;
