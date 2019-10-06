const PostController = require("../controllers/post");
const CommentController = require("../controllers/comment");

module.exports = app => {
  // Post Routes
  app.get("/feed/posts/:sort/:skip", PostController.getPosts);
  app.get("/feed/posts/:profileId/:sort/:skip", PostController.getSubscribedPosts);
  app.get("/posts/:id", PostController.getPost);
  app.get("/posts/active/:username", PostController.getActivePostByUser);

  app.post("/posts", PostController.createPost);
  app.delete("/posts/:postId", PostController.deletePost);

  // app.put('/posts/:postId', PostController.updatePost);
};
