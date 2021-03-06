var express = require('express');
var router = express.Router();
const foundersCtrl = require('../controllers/founders');

/* GET users listing. */
router.get('/', foundersCtrl.index);
router.get('/new', isLoggedIn, foundersCtrl.new);
router.get('/:id', foundersCtrl.show);
router.get('/:id/edit', isLoggedIn, foundersCtrl.edit);
router.put('/:id', foundersCtrl.update);
router.post('/', foundersCtrl.create);
router.post('/:id/likes', isLoggedIn, foundersCtrl.like);
router.delete('/:id', isLoggedIn, foundersCtrl.delete);
router.delete('/:id/likes', foundersCtrl.dislike);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;
