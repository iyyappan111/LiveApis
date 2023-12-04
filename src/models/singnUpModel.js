const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  key: String,
  data: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
