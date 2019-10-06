const UpvoteController = require('../controllers/upvote');

module.exports = app => {
  app.get('/upvotes/count/:commentId', UpvoteController.getUpvoteCount);
};
