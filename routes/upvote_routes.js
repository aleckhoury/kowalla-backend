const UpvoteController = require('../controllers/upvote_controller');

module.exports = (app) => {
    // app.get('/api/v1/reactions/:postId', UpvoteController.getReactionList);
    app.get('/api/v1/upvotes/count/:commentId', UpvoteController.getUpvoteCount);
}