// Import del modulo dotenv per caricare le variabili d'ambiente
require('dotenv').config();

// Configurazione delle opzioni di sessione
const sessionOptions = {
    secret: process.env.SESSION_SECRET || 'your_session_secret_here',
    resave: false,
    saveUninitialized: false
};

// Esportazione delle opzioni di sessione
module.exports = sessionOptions;
