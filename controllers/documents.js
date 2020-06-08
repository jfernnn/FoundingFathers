const Document = require('../models/document');
const Founder = require('../models/founder');

module.exports = {
    new: newDocument,
    create,
    addSigner,
    index,
    delete: deleteDoc
}

function newDocument(req, res) {
    res.render('documents/new', {
        title: 'New Document',
        user: req.user
    });
}

function create(req, res) {
    const document = new Document(req.body);
    document.googleId = req.user.googleId;
    document.save(function(err) {
        res.redirect('../../founders');
    });
}

function addSigner(req, res) {
    Founder.findById(req.params.id, function(err, founder) {
        founder.documentsSigned.push(req.body.documentId);
        founder.save(function(err) {
            Document.findById(req.body.documentId, function(err, document) {
                document.signers.push(req.params.id);
                document.save(function(err) {
                    res.redirect(`/founders/${founder._id}`);
                });
            });
        });
    });
}

function index(req, res) {
    Document.find({})
     .populate('signers')
      .exec(function(err, documents) {  
        documents.forEach(function(d) {
            d.dateSignedFormatted = (d.dateSigned.getUTCMonth() + 1).toString() + "/" + 
            d.dateSigned.getUTCDate() + "/" + d.dateSigned.getUTCFullYear().toString()
        });
        res.render('documents/index', {
            title: 'All Documents', 
            documents,
            user: req.user
        });
    });
}

function deleteDoc(req, res) {
    Document.deleteOne({_id: req.params.id}, function(err) {
        res.redirect('/documents');
    })
}