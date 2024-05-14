// Import del modulo dotenv per caricare le variabili d'ambiente
require('dotenv').config();

// Definizione dell'URL del database MongoDB
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://simone:<password>@cluster0.7dpoap2.mongodb.net/';

// Esportazione dell'URL del database
module.exports = {
    url: dbURI
};
