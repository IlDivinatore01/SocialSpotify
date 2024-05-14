// Import dei moduli necessari
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

// Inizializzazione dell'app Express
const app = express();

// Configurazione delle variabili d'ambiente
dotenv.config();

// Configurazione del database
const db = require('./config/database');
mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connessione al database MongoDB riuscita'))
    .catch(err => console.error('Errore durante la connessione al database', err));

// Configurazione delle sessioni
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Inizializzazione di Passport.js per l'autenticazione
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Middleware per il parsing del body delle richieste
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware per servire i file statici
app.use(express.static('public'));

// Configurazione delle route
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const playlistsRouter = require('./routes/playlists');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/playlists', playlistsRouter);
app.use('/users', usersRouter);

// Avvio del server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
