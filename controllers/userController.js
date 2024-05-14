const User = require('../models/user');

// Controller per la visualizzazione del profilo utente
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Errore durante la visualizzazione del profilo utente:", error);
        res.status(500).json({ message: "Errore durante la visualizzazione del profilo utente" });
    }
};

// Altri controller per la modifica delle preferenze utente, la cancellazione dell'account, ecc., possono essere implementati qui
