const Founder = require('../models/founder');
const Document = require('../models/document');

module.exports = {
    index,
    new: newFounder,
    create,
    show,
    delete: deleteFounder,
    edit,
    update,
    like,
    dislike
}

function index(req, res) {
    Founder.find({}, function(err, founders){
        founders.forEach(function(f) {
            f.birthDayFormatted =  (f.birthDay.getUTCMonth() + 1).toString() + "/" + 
            f.birthDay.getUTCDate() + "/" + f.birthDay.getUTCFullYear().toString()
            const idx = f.bio.search(/[.]/g);
            if (idx === -1) {
                f.shortBio = f.bio;
            } else {
                f.shortBio = f.bio.substring(0, idx+1);
            }
        });
        Document.find({}, function(err, documents){
            res.render('founders/index', {
                title: 'View Founders', 
                founders,
                documents,
                user: req.user
            });
        });
    });
}

function newFounder(req, res) {
    res.render('founders/new', {
        title: 'New Founder',
        user: req.user
    });
}

function create(req, res) {
    const founder = new Founder(req.body);
    founder.googleId = req.user.googleId;
    const idx = founder.bio.search(/[.]/g);
    if (idx === -1) {
        founder.shortBio = founder.bio;
    } else {
        founder.shortBio = founder.bio.substring(0, idx+1);
    }
    if(founder.imgURL == '') {
        founder.imgURL = 'https://cdn.shopify.com/s/files/1/0200/0548/products/414GA_1296x.png?v=1482263956';
    }
    founder.birthDayFormatted =  (founder.birthDay.getUTCMonth() + 1).toString() + "/" + 
        founder.birthDay.getUTCDate() + "/" + founder.birthDay.getUTCFullYear().toString();
    founder.save(function(err){
        res.redirect('/founders');
    });
}

function show(req, res) {
    Founder.findById(req.params.id)
     .populate('documentsSigned')
      .exec(function(err, founder){
        
        founder.birthDayFormatted =  (founder.birthDay.getUTCMonth() + 1).toString() + "/" + 
        founder.birthDay.getUTCDate() + "/" + founder.birthDay.getUTCFullYear().toString();
        Document.find({_id: {$nin: founder.documents}}, function(err, documents){  
            res.render(`founders/show`, {
                title: 'Show Founder',
                user: req.user,
                founder,
                documents
            });
        });
    });
}

function deleteFounder(req, res) {
    Founder.deleteOne({_id: req.params.id}, function(err){
        res.redirect('/founders');
    });
}

function edit(req, res) {
    Founder.findById(req.params.id, function(err, founder){
        if(req.user.googleId === founder.googleId) {
            res.render('founders/edit', {
                title: 'Edit Founder',
                user: req.user,
                founder
            })
        } else {
            res.redirect('/founders');
        }
    });
}

function update(req, res) {
    Founder.findById(req.params.id, function(err, founder){
        Object.assign(founder, req.body);
        const idx = founder.bio.search(/[.]/g);
        if (idx === -1) {
            founder.shortBio = founder.bio;
        } else {
            founder.shortBio = founder.bio.substring(0, idx+1);
        }
        if(founder.imgURL == '') {
            founder.imgURL = 'https://cdn.shopify.com/s/files/1/0200/0548/products/414GA_1296x.png?v=1482263956';
        }
        founder.birthDayFormatted =  (founder.birthDay.getUTCMonth() + 1).toString() + "/" + 
          founder.birthDay.getUTCDate() + "/" + founder.birthDay.getUTCFullYear().toString();
        founder.save(function(err){
            res.redirect(`/founders/${req.params.id}`);
        });
    });
}

function like(req, res) {
    Founder.findById(req.params.id, function(err, founder) {
        founder.likes.push(req.user.googleId);
        founder.save(function(err) {
            res.redirect(`../../founders/${req.params.id}`)
        });
    });
}

function dislike(req, res) {
    Founder.findById(req.params.id, function(err, founder) {
        for(var i = 0; i < founder.likes.length; i++) {
            if(founder.likes[i] === req.user.googleId) {
                founder.likes.splice(i, 1);
                founder.save(function(err){
                    res.redirect(`../../founders/${req.params.id}`)
                });
            }
        }
    })
}