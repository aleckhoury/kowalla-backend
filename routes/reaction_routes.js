const ReactionController = require('../controllers/reaction_controller');

module.exports = (app) => {
    // Reaction Routes
    app.get('/api/v1/posts/:postId/reactions', ReactionController.getReactionList);
};