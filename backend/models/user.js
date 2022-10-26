const mongoose = require('mongoose'); // Permet d'utiliser la base de donnée MongoDB
const uniqueValidator = require('mongoose-unique-validator'); // Plugin qui oblige un utilisateur à n'avoir qu'un seul pseudo et adresse email sinon renvois une erreur

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);