const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    title: String,
    dateSigned: Date,
    dateSignedFormatted: String,
    significance: String,
    googleId: String,
    signers: [{
        type: Schema.Types.ObjectId,
        ref: 'Founder'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Document', documentSchema);