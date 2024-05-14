const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Altri campi del modello playlist possono essere aggiunti qui
}, { timestamps: true });

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
