const PostController = require('../controllers/post_controller');
const CommentController = require('../controllers/comment_controller');

module.exports = (app) => {
// Post Routes
app.get('/api/v1/feed/posts/:sort/:skip', PostController.getPosts);
app.get('/api/v1/posts/:id', PostController.getPost);
app.get('/api/v1/posts/active/:profileId', PostController.getActivePostByUser);

// app.post('/api/v1/posts', PostController.createPost);
// app.put('/api/v1/posts/:postId', PostController.updatePost);
};