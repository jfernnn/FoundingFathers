const Founder = require('../models/founder');

module.exports = {
    index
}

function index(req, res) {
    Founder.find({}, function(err, founders) {
        res.render('users/home', {
            title: 'Home',
            founders,
            user: req.user
        })
    })
}