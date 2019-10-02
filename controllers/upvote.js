// Dependencies

// Models
const Upvote = require('../models/UpvoteModel');
const Comment = require('../models/CommentModel');
const NotificationHelper = require('../helpers/notification_helpers');

module.exports = {
  async getUpvoteList(req, res, next) {
    // Init
    const { profileId } = req.params;

    // Act
    const upvotes = await Upvote.find({ profileId });

    // Send
    res.status(200).send({ upvotes });
  },

  async getUpvoteCount(req, res, next) {
    const { commentId } = req.params;
    const upvoteCount = await Upvote.count({ commentId });
    res.status(200).send({ count: upvoteCount });
  },

  async getUpvote(req, res, next) {
    // gets a single upvote for a comment
    // Init
    const { profileId, commentId } = req.params;

    // Act
    const count = await Upvote.countDocuments({ commentId });
    const userUpvoted = await Upvote.findOne({ commentId, profileId })
      .countDocuments()
      .exec();
    const upvoteRes = {
      count,
      userUpvoted
    };
    // Send
    res.status(200).send(upvoteRes);
  },

  async createUpvote(req, res, next) {
    // Init
    const { commentId, profileId } = req.body;

    // Act
    const upvote = await Upvote.create({ profileId, commentId });

    // Send
    upvote.save();
    res.status(201).send(upvote);

    // Build Notification

    // first we need the owner of the comment
    let comment = await Comment.findOne({ _id: commentId }, 'profileId');
    let notifObject = {
      ownerProfileId: comment.profileId,
      sendingProfileId: profileId,
      commentId
    };

    await NotificationHelper.createNotification('new-upvote', notifObject);
  },

  async deleteUpvote(req, res, next) {
    // Init
    const { profileId, commentId } = req.params;

    // Act
    await Upvote.findOneAndDelete({ profileId, commentId });
    const upvote = await Upvote.findOne({ profileId, commentId });

    // Send
    res.status(204).send(upvote);
  }
};
