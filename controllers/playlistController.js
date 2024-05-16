const Playlist = require('../models/playlist');

// Controller for creating a new playlist
exports.createPlaylist = async (req, res) => {
    try {
        const { title, description, songs } = req.body;

        // Validate title, description, and songs
        if (!title || title.trim().length === 0) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (!description || description.trim().length < 10) {
            return res.status(400).json({ message: "Description must be at least 10 characters" });
        }

        if (!songs || !Array.isArray(songs) || songs.length === 0) {
            return res.status(400).json({ message: "At least one song is required" });
        }

        // Create a new playlist in the database
        const newPlaylist = new Playlist({
            title,
            description,
            songs,
            owner: req.user._id // Get the ID of the logged-in user
        });

        await newPlaylist.save();

        res.status(201).json({ message: "Playlist successfully created", playlist: newPlaylist });
    } catch (error) {
        console.error("Error during playlist creation:", error);
        res.status(500).json({ message: "Error during playlist creation" });
    }
};

// Controller for modifying a playlist
exports.modifyPlaylist = async (req, res) => {
    try {
        const { title, description, songs } = req.body;
        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        if (title) playlist.title = title;
        if (description) playlist.description = description;
        if (songs) playlist.songs = songs;

        await playlist.save();

        res.status(200).json({ message: "Playlist successfully updated", playlist });
    } catch (error) {
        console.error("Error during playlist modification:", error);
        res.status(500).json({ message: "Error during playlist modification" });
    }
};

// Controller for deleting a playlist
exports.deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        await playlist.remove();

        res.status(200).json({ message: "Playlist successfully deleted" });
    } catch (error) {
        console.error("Error during playlist deletion:", error);
        res.status(500).json({ message: "Error during playlist deletion" });
    }
};

// Controller for viewing a playlist
exports.viewPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.status(200).json({ playlist });
    } catch (error) {
        console.error("Error during playlist retrieval:", error);
        res.status(500).json({ message: "Error during playlist retrieval" });
    }
};