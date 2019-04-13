const CommentController = require('../controllers/comment_controller');
const UpvoteController = require('../controllers/upvote_controller');

module.exports = (app) => {
    // Comment Routes
    app.get('/api/v1/comments/:postId', CommentController.getPostCommentList);
    app.get('/api/v1/comments/:postId/:commentId', CommentController.getCommentReplyList);
    // app.get('/api/v1/comments/:id', CommentController.getPost);
    app.post('/api/v1/comments', CommentController.createPostComment);

    // Upvote Routes
    app.get('/api/v1/comments/:commentId/:profileId/upvote', UpvoteController.getUpvote);
    app.post('/api/v1/comments/upvote', UpvoteController.createUpvote);
    app.delete('/api/v1/comments/:commentId/:profileId/upvote', UpvoteController.deleteUpvote);
};