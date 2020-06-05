const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    email: String,
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);