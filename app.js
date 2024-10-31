// Charger les variables d'environnement
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Person = require('./models/person.js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à la base de données'))
  .catch(err => console.error('Erreur de connexion à la base de données', err));

// 3. Créer et enregistrer un document avec un modèle
const createAndSavePerson = async () => {
  const person = new Person({ name: 'John', age: 30, favoriteFoods: ['Pizza', 'Pasta'] });
  await person.save();
};

// 4. Créer plusieurs documents avec model.create()
const createMultiplePeople = async () => {
  await Person.create([
    { name: 'Alice', age: 25, favoriteFoods: ['Salade'] },
    { name: 'Bob', age: 35, favoriteFoods: ['Sushi'] }
  ]);
};

// 5. Rechercher des documents avec model.find()
const findPersonByName = async (name) => {
  const people = await Person.find({ name });
  console.log(people);
};

// 6. Utiliser model.findOne() pour retourner un document unique
const findOnePersonByFood = async (food) => {
  const person = await Person.findOne({ favoriteFoods: food });
  console.log(person);
};

// 7. Rechercher par _id avec model.findById()
const findPersonById = async (id) => {
  const person = await Person.findById(id);
  console.log(person);
};

// 8. Mettre à jour un document
const updatePersonFavoriteFood = async (id) => {
  const person = await Person.findById(id);
  person.favoriteFoods.push('hamburger');
  await person.save();
};

// 9. Mise à jour avec model.findOneAndUpdate()
const updatePersonAgeByName = async (name, age) => {
  const updatedPerson = await Person.findOneAndUpdate({ name }, { age }, { new: true });
  console.log(updatedPerson);
};

// 10. Supprimer un document
const removePersonById = async (id) => {
  const removedPerson = await Person.findByIdAndRemove(id);
  console.log(removedPerson);
};

// 11. Supprimer plusieurs documents
const removePeopleByName = async (name) => {
  const result = await Person.remove({ name });
  console.log(result);
};

// 12. Chaîner les requêtes pour affiner les résultats
const findPeopleWithFood = async (food) => {
  const people = await Person.find({ favoriteFoods: food })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec();
  console.log(people);
};

// Exécuter les fonctions pour tester
(async () => {
  await createAndSavePerson();
  await createMultiplePeople();
  await findPersonByName('John');
  await findOnePersonByFood('Pizza');
  await findPersonById('6723ca8172fcbc0b3e6c32dc'); // Remplacez par un ID valide
  await updatePersonFavoriteFood('6723ca8172fcbc0b3e6c32dc'); // Remplacez par un ID valide
  await updatePersonAgeByName('John', 20);
//   await removePersonById('your_person_id'); // Remplacez par un ID valide
//   await removePeopleByName('Mary');
//   await findPeopleWithFood('burritos');
})();

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
