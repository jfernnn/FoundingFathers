const Founder = require('../models/founder');
const Document = require('../models/document');

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
        Document.find({}, function(err, documents){
            res.render('founders/index', {
                title: 'View Founders', 
                founders,
                documents,
                user: req.user
            })
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
    founder.googleId = req.user.googleId;
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
        console.log('req user id ----->',req.user.googleId)
        console.log('founder id ----->',founder.googleId)
        
        if(req.user.googleId === founder.googleId) {
            res.render('founders/edit', {
                title: "Edit Founder",
                user: req.user,
                founder
            })
        } else {
            console.log('POOOPPPY')
            res.redirect('/founders');
        }
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