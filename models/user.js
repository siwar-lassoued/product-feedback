const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Si tu veux que l'email soit unique dans la base de données
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
