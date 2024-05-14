const Playlist = require('../models/playlist');

// Controller per la creazione di una nuova playlist
exports.createPlaylist = async (req, res) => {
    try {
        const { title, description, songs } = req.body;

        // Creazione di una nuova playlist nel database
        const newPlaylist = new Playlist({
            title,
            description,
            songs,
            owner: req.user._id // Ottieni l'ID dell'utente loggato
        });

        await newPlaylist.save();

        res.status(201).json({ message: "Playlist creata con successo", playlist: newPlaylist });
    } catch (error) {
        console.error("Errore durante la creazione della playlist:", error);
        res.status(500).json({ message: "Errore durante la creazione della playlist" });
    }
};

// Altri controller per la modifica, la cancellazione e la visualizzazione delle playlist possono essere implementati qui
