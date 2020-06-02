const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchema = new Schema ({
    achievement: String
}, {
    timestamps: true
})

const founderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    wasPresident: String,
    birthDay: Date,
    homeState: String,
    bio: String,
    achievements: [achievementSchema],
    documentsSigned: [{
        type: Schema.Types.ObjectId,
        ref: 'Document'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Founder', founderSchema);