const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const UserSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  username: String,
  email: String,
  password: String,
},
{
  timestamps: true
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
