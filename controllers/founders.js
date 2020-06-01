const Founder = require('../models/founder');

module.exports = {
    index,
    new: newFounder
}

function index(req, res) {
    Founder.find({}, function(err, founders){
        res.render('founders/index', {title: 'View Founders', founders})
    })
}

function newFounder(req, res) {
    res.render('founders/new', {title: "New Founder"});
}