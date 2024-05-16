// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

// Initialize Express app
const app = express();

// Configure environment variables
dotenv.config();

// Configure the database
const db = require('./config/database');
mongoose.connect(db.url)
    .then(() => console.log('Successfully connected to MongoDB database'))
    .catch(err => console.error('Error while connecting to the database', err));

// Configure sessions
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to serve static files
app.use(express.static('public'));

// Configure routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const playlistsRouter = require('./routes/playlists');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/playlists', playlistsRouter);
app.use('/users', usersRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});