const Upvote = require('../models/UpvoteModel');

module.exports = {
  async getUpvoteList(req, res, next) {
    // Init
    const { profileId } = req.params;

    // Act
    const upvotes = await Upvote.find({_id: profileId});

    // Send
    res.status(200).send({upvotes});
  },

  async getUpvote(req, res, next) { // gets a single upvote for a comment
    // Init
    const {
      profileId,
      commentId
    } = req.params;

    // Act
    const upvote = await Upvote.findOne({profileId, commentId});

    // Send
    res.status(200).send(upvote);
  },

  async createUpvote(req, res, next) {
    // Init
    const { // these need to be null'd if they're not being used
      profileId,
      commentId
    } = req.params;

    // Act
    const upvote = await Upvote.create({profileId, commentId});

    // Send
    res.status(201).send(subscription);
  },

  async deleteUpvote(req, res, next) {
    // Init
    const {
      profileId,
      commentId,
    } = req.params;

    // Act
    await Upvote.findOneAndDelete({profileId, commentId});
    const upvote = await Upvote.findOne({profileId, commentId});

    // Send
    res.status(204).send(subscription);
  },
}
