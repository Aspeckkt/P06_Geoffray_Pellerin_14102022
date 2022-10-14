const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const path = require('path');
const sauceRoutes = require('./routes/sauces');
const dotenv = require('dotenv').config();

/* Ligne qui permet de ce connecter dans notre base de données */
mongoose.connect(process.env.MONGO,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

/* #crud Ligne qui permet a (tout) utilisateurs de crées, modifier, afficher ou supprimer un objet dans notre base de données */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;