const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

// Controller per la registrazione di un nuovo utente
exports.registerUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Verifica se la password e la conferma della password corrispondono
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Le password non corrispondono" });
        }

        // Hash della password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creazione di un nuovo utente nel database
        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "Utente registrato con successo" });
    } catch (error) {
        console.error("Errore durante la registrazione dell'utente:", error);
        res.status(500).json({ message: "Errore durante la registrazione dell'utente" });
    }
};

// Controller per il login di un utente
exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({ message: "Login effettuato con successo", user });
        });
    })(req, res, next);
};

// Controller per il logout di un utente
exports.logoutUser = (req, res) => {
    req.logout();
    res.status(200).json({ message: "Logout effettuato con successo" });
};
