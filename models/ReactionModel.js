const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const ReactionSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  profileId: String,
  postId: String,
  updateId: String,
  emoji: String, // TODO: change to whatever value we need to sort by
},
{
  timestamps: true
});

const Reaction = mongoose.model('reaction', ReactionSchema);

module.exports = Reaction;
