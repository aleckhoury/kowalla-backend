const ReactionController = require("../controllers/reaction_controller");

module.exports = app => {
  // Reaction Routes
  app.get("/posts/:postId/reactions", ReactionController.getReactionList);
};
