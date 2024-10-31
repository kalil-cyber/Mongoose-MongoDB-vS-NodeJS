const mongoose = require('mongoose');

/**
 * Création d'un schéma pour le modèle Person
 */
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Champ obligatoire
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String], // Tableau de chaînes de caractères
    required: false,
  },
});

// Création du modèle
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
