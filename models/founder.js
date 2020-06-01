const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const founderSchema = new Schema({
    name: String,
    wasPresident: String,
    birthDay: Date,
    homeState: String,
    bio: String
}, {
    timestamps: true
})