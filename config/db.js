const mongoose = require('mongoose');
require('dotenv').config(); // Charger les variables d'environnement

/**
 * Fonction pour connecter à la base de données MongoDB
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connecté à la base de données');
  } catch (err) {
    console.error('Erreur de connexion à la base de données', err);
    process.exit(1); // Quitter le processus en cas d'erreur
  }
};

module.exports = connectDB; // Exporter la fonction pour l'utiliser dans app.js
