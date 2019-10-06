const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  username: { type: String, unique: true, required: true, uniqueCaseInsensitive: true },
  email: { type: String, unique: true, uniqueCaseInsensitive: true },
  password: { type: String },
},
{ collation: { locale: 'en_US', strength: 1 }, timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'This username or email is already taken.' });

const User = mongoose.model('user', UserSchema);

module.exports = User;
