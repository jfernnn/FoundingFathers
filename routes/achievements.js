var express = require('express');
var router = express.Router();
const achievementsCtrl = require('../controllers/achievements');

/* GET users listing. */
router.post('/founders/:id/achievements', achievementsCtrl.create)

module.exports = router;