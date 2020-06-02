const Founder = require('../models/founder');

module.exports = {
    create
}

function create(req, res) {
    Founder.findById(req.params.id, function(err, founder) {
        founder.achievements.push(req.body);
        console.log(req.body)
        founder.save(function(err) {
            res.redirect(`/founders/${founder.id}`)
        })
    })
}