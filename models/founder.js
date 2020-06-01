const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const founderSchema = new Schema({
    name: String,
    wasPresident: Boolean,
    birthDay: Date,
    homeState: String,
    bio: String
}, {
    timestamps: true
})