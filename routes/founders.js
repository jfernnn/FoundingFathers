var express = require('express');
var router = express.Router();
const foundersCtrl = require('../controllers/founders');

/* GET users listing. */
router.get('/', foundersCtrl.index);
router.get('/new', foundersCtrl.new);
router.get('/:id', foundersCtrl.show);
router.get('/:id/edit', foundersCtrl.edit);
router.put('/:id', foundersCtrl.update)
router.post('/', foundersCtrl.create);
router.delete('/:id', foundersCtrl.delete)

module.exports = router;
