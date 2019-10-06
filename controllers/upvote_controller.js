// Dependencies

// Models
const Upvote = require('../models/UpvoteModel');
const Comment = require('../models/CommentModel');
const NotificationHelper = require('../helpers/notification_helpers');

module.exports = {
  async getUpvoteList(request, reply) {
    // Init
    const { profileId } = request.params;

    // Act
    const upvotes = await Upvote.find({profileId});

    // Send
    reply.code(200).send({upvotes});
  },

  async getUpvoteCount(request, reply) {

    const { commentId } = request.params;
    const upvoteCount = await Upvote.count({ commentId });
    reply.code(200).send({ count: upvoteCount });
  },

  async getUpvote(request, reply) { // gets a single upvote for a comment
    // Init
    const {
      profileId,
      commentId
    } = request.params;

    // Act
    const count = await Upvote.countDocuments({commentId});
    const userUpvoted = await Upvote.findOne({ commentId, profileId }).countDocuments().exec();
    const upvoteRes = {
      count,
      userUpvoted,
    };
    // Send
    reply.code(200).send(upvoteRes);
  },

  async createUpvote(request, reply) {
    // Init
    const { commentId, profileId } = request.body;

    // Act
    const upvote = await Upvote.create({profileId, commentId});

    // Send
    upvote.save();
    reply.code(201).send(upvote);

    // Build Notification

    // first we need the owner of the comment
    let comment = await Comment.findOne({_id: commentId}, 'profileId');
    let notifObject = {
      ownerProfileId: comment.profileId,
      sendingProfileId: profileId,
      commentId,
    }

    await NotificationHelper.createNotification("new-upvote", notifObject);
  },

  async deleteUpvote(request, reply) {
    // Init
    const {
      profileId,
      commentId,
    } = request.params;

    // Act
    await Upvote.findOneAndDelete({profileId, commentId});
    const upvote = await Upvote.findOne({profileId, commentId});

    // Send
    reply.code(204).send(upvote);
  },
}
