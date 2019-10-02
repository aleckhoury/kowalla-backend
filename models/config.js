const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const ConfigSchema = new Schema(
  {
    _id: { type: String, default: shortid.generate },
    name: String,
    options: Object
  },
  {
    timestamps: true
  }
);

const Config = mongoose.model('config', ConfigSchema);

module.exports = Config;
