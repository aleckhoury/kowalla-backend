const OAuthController = require('../controllers/oauth_controller.js');

module.exports = (app) => {
// Post Routes
    app.post('/api/v1/github/signin', OAuthController.authGithubUser);

// app.post('/api/v1/posts', PostController.createPost);
// app.put('/api/v1/posts/:postId', PostController.updatePost);
};