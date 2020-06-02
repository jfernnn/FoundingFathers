const Document = require('../models/document');

module.exports = {
    new: newDocument,
    create
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