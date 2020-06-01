const Founder = require('../models/founder');

module.exports = {
    index,
    new: newFounder,
    create
}

function index(req, res) {
    Founder.find({}, function(err, founders){
        res.render('founders/index', {
            title: 'View Founders', 
            founders,
            user: req.user
        })
    })
}

function newFounder(req, res) {
    res.render('founders/new', {title: "New Founder"});
}

function create(req, res) {
    const founder = new Founder(req.body);
    console.log(req.body);
    founder.save(function(err){
        res.redirect('/founders');
    })
}