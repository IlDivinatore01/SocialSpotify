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
    // Other fields for the playlist model can be added here
}, { timestamps: true });

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;