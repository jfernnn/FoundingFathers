const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    name: String,
    dateSigned: Date,
    significance: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Document', documentSchema)