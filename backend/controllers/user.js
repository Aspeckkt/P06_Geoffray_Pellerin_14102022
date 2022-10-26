const bcrypt = require('bcrypt'); // Plugin permetant de Hasher le mot de passe des utilisateurs afin que même l'administrateur ne puissent pas les connaitres
const jwt = require('jsonwebtoken'); // Génère à la connexion d'un compte utilisateur un token Hasher et unique pour chaque utilisateur et dure 24H
const validator = require('email-validator'); // Pourrait être remplacer pars des RegEx oblige un utilisateur d'utiliser un mail valide
const User = require('../models/user') // Renvois apres l'inscription les information des utilisateurs vers notre base de données

exports.signup = (req, res, next) => {
    if (!validator.validate(req.body.email)) return res.status(403).json({ message: 'Le format de l\'adresse mail est incorrect.' })
    if (req.body.password.length > 8) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé.' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    } else return res.status(403).json({ message: 'Votre mot de passe doit contenir 8 caractères minimum.' })
};
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
