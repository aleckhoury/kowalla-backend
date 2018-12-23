const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String, // TODO: hash this
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
