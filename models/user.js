const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Other fields for the user model can be added here
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;