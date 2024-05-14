// Import del modulo dotenv per caricare le variabili d'ambiente
require('dotenv').config();

// Definizione dell'URL del database MongoDB
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-for-music';

// Esportazione dell'URL del database
module.exports = {
    url: dbURI
};
