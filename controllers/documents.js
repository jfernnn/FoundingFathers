const Document = require('../models/document');

module.exports = {
    new: newDocument
}

function newDocument(req, res) {
    res.render('documents/new', {
        title: 'New Document',
        user: req.user
    })
}