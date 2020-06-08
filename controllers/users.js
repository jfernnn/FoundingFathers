const Founder = require('../models/founder');
const Document = require('../models/document')

module.exports = {
    index
}

function index(req, res) {
    Founder.find({}, function(err, founders) {
        Document.find({}, function(err, documents) {
            documents.forEach(function(d) {
                d.dateSignedFormatted = (d.dateSigned.getUTCMonth() + 1).toString() + "/" + 
                d.dateSigned.getUTCDate() + "/" + d.dateSigned.getUTCFullYear().toString()
            });
            res.render('users/home', {
                title: 'Home',
                founders,
                documents,
                user: req.user
            })
        });
    })
}