const express = require('express');
const router = express.Router();
const documentsCtrl = require('../controllers/documents');

router.get('/documents/new', isLoggedIn, documentsCtrl.new);
router.post('/documents', documentsCtrl.create);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;