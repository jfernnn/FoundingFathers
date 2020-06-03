const Document = require('../models/document');
const Founder = require('../models/founder')

module.exports = {
    new: newDocument,
    create,
    addSigner
}

function newDocument(req, res) {
    res.render('documents/new', {
        title: 'New Document',
        user: req.user
    })
}

function create(req, res) {
    const s = req.body.dateSigned;
    req.body.dateSigned = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
    Document.create(req.body, function(err) {
        res.redirect('../../founders');
    })
}

function addSigner(req, res) {
    console.log('-----------',req.body.documentId);
    Founder.findById(req.params.id, function(err, founder) {
        founder.documentsSigned.push(req.body.documentId)
        founder.save(function(err) {
            res.redirect(`/founders/${founder._id}`)
        })
    })
}