const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    title: String,
    dateSigned: Date,
    significance: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Document', documentSchema);