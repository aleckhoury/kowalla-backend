const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const ReputationSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  profileId: String,
  projectId: String,
});

const Reputation = mongoose.model('reputation', ReputationSchema);

module.exports = Reputation;
