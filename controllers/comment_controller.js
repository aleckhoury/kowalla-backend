const Comment = require('../models/CommentModel');

module.exports = {
  async getCommentList(req, res, next) {
    // Init
    const { postId } = req.params;

    // Act
    const comments = await Comment.find({postId});

    // Send
    res.status(200).send({comments});
  },

  async getComment(req, res, next) {
    // Init
    const {
      postId,
      commentId
    } = req.params;

    // Act
    const comment = await Comment.findOne({postId, _id: commentId});

    // Send
    res.status(200).send(comment);
  },

  async createComment(req, res, next) {
    // Init
    const {
      profileId,
      commentId,
      content,
    } = req.body;

    const { postId } = req.params;

    const views = 0;
    // Act
    const comment = await Comment.create({profileId, commentId, content, postId, views});

    // Send
    await comment.save();
    res.status(201).send(comment);
  },

  async deleteComment(req, res, next) {
    // Init
    const { commentId } = req.params;

    // Act
    await Comment.findOneAndDelete({_id: commentId});
    const comment = await Comment.findOne({_id: commentId});

    // Send
    res.status(204).send(comment);
  },

}
