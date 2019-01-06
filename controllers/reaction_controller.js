const Reaction = require('../models/ReactionModel');

module.exports = {
  async getReactionList(req, res, next) {
    // Init
    const { profileId } = req.params;

    // Act
    const reactions = await Reaction.find({profileId});

    // Send
    res.status(200).send({reactions});
  },

  async getReaction(req, res, next) {
    // Init
    const {
      profileId,
      postId,
    } = req.params;

    // Act
    const reaction = await Reaction.findOne({profileId, postId});

    // Send
    res.status(200).send(reaction);
  },

  async createReaction(req, res, next) {
    // Init
    const {
      profileId,
      postId,
    } = req.params;

    // Act
    const reaction = await Reaction.create({profileId, postId});

    // Send
    res.status(201).send(reaction);
  },

  async deleteReaction(req, res, next) {
    // Init
    const {
      profileId,
      postId,
    } = req.params;

    // Act
    await Reaction.findOneAndDelete({profileId, postId});
    const reaction = await Reaction.findOne({profileId, postId});

    // Send
    res.status(204).send(reaction);
  },

}
