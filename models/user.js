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
    // Altri campi del modello utente possono essere aggiunti qui
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
