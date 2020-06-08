const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchema = new Schema ({
    achievement: String,
    googleId: String
}, {
    timestamps: true
});

const founderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    wasPresident: String,
    birthDay: {
        type: Date,
        required: true
    },
    birthDayFormatted: String,
    homeState: String,
    bio: String,
    shortBio: String,
    googleId: String,
    imgURL: String,
    likes: [String],
    achievements: [achievementSchema],
    documentsSigned: [{
        type: Schema.Types.ObjectId,
        ref: 'Document'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Founder', founderSchema);