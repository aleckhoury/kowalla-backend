const UpvoteController = require('../controllers/upvote_controller');

module.exports = app => {
  app.get('/upvotes/count/:commentId', UpvoteController.getUpvoteCount);
};
