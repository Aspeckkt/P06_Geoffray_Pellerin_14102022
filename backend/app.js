const express = require('express'); // Permet d'utiliser Express dans notre projet JS
const bodyParser = require('body-parser'); // Permet d'effectuer les requetes vers nos middleware pour chaques formulaires
const userRoutes = require('./routes/user');// Route vers L'API des utilisateurs
const mongoose = require('mongoose'); // Permet d'utiliser la base de donnée MongoDB
const path = require('path'); // Renvois vers le dossier cibler ici /images
const sauceRoutes = require('./routes/sauces'); // Route vers L'API des sauces
const dotenv = require('dotenv').config(); // Variable contenant les données sensible que l'ont ne souhaite pas partager aux utilisateurs
const helmet = require('helmet'); // Crée diffèrent header pour prévenir de potentiels attaque mal intentionnées

/* Ligne qui permet de ce connecter dans notre base de données */
mongoose.connect(process.env.MONGO, // MONGO est la variable crée permetant de cacher L'utilisateur le MDP ainsi que le cluster mongo DB
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

/* #cors Ligne qui permet a tout* utilisateurs de crées, modifier, afficher ou supprimer un objet dans notre base de données */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // crud
  next();
});

// Utilisation des déclaration de constante ci-dessus
app.use(bodyParser.json());
app.use(helmet.xssFilter());
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;