const CommentController = require('../controllers/comment_controller');
const UpvoteController = require('../controllers/upvote_controller');

module.exports = app => {
  // Comment Routes
  app.get('/comments/:postId', CommentController.getPostCommentList);
  app.get('/comments/:postId/:commentId', CommentController.getCommentReplyList);
  app.post('/comments', CommentController.createPostComment);

  // Upvote Routes
  app.get('/comments/:commentId/:profileId/upvote', UpvoteController.getUpvote);
  app.post('/comments/upvote', UpvoteController.createUpvote);
  app.delete('/comments/:commentId/:profileId/upvote', UpvoteController.deleteUpvote);
};
