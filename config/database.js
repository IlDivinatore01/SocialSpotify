// Import the dotenv module to load environment variables
require('dotenv').config();

// Define the MongoDB database URL
const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Export the database URL
module.exports = {
    url: dbURI
};