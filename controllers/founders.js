const Founder = require('../models/founder');

module.exports = {
    index,
    new: newFounder,
    create,
    show,
    delete: deleteFounder,
    edit,
    update
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
    res.render('founders/new', {
        title: "New Founder",
        user: req.user
    });
}

function create(req, res) {
    const founder = new Founder(req.body);
    console.log(req.body);
    founder.save(function(err){
        res.redirect('/founders');
    })
}

function show(req, res) {
    Founder.findById(req.params.id, function(err, founder){
        res.render(`founders/show`, {
            title: 'Show Founder',
            user: req.user,
            founder
        })
    })
}

function deleteFounder(req, res) {
    Founder.deleteOne({_id: req.params.id}, function(err){
        res.redirect('/founders');
    })
}

function edit(req, res) {
    Founder.findById(req.params.id, function(err, founder){
        res.render('founders/edit', {
            title: "Edit Founder",
            user: req.user,
            founder
        })
    })
}

function update(req, res) {
    console.log(req.body);
    Founder.findById(req.params.id, function(err, founder){
        Object.assign(founder, req.body);
        founder.save(function(err){
            res.redirect(`/founders/${req.params.id}`);
        })
    })
}