// Import the dotenv module to load environment variables
require('dotenv').config();

// Define the session options
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
};

if (!sessionOptions.secret) {
  throw new Error('Please define the SESSION_SECRET environment variable');
}

// Export the session options
module.exports = sessionOptions;