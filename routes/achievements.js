var express = require('express');
var router = express.Router();
const achievementsCtrl = require('../controllers/achievements');

/* GET users listing. */
router.post('/founders/:id/achievements', isLoggedIn, achievementsCtrl.create)

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;