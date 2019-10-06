const ProjectController = require("../controllers/project");
const PostController = require("../controllers/post");
const UpdateController = require("../controllers/update");
const CommentController = require("../controllers/comment");

module.exports = app => {
  app.get("/projects", ProjectController.getProjectList);
  app.get("/projects/:id", ProjectController.getProject);
  app.post("/projects", ProjectController.createProject);
  app.put("/projects/:id", ProjectController.updateProject);
  app.delete("/projects/:id", ProjectController.deleteProject);
  app.post("/spaces/:projectId/posts", PostController.createPost);

  app.get("/projects/project/:projectName", ProjectController.getProjectByName);
  // ##########################################################################
  // Post Routes
  // ##########################################################################
  /*
  | List: GET /projects/-/posts : sent [n/a]; response [object]
  */

  app.get("/project/posts/:projectId/:sort/:skip", PostController.getProjectPostList);

  // ##########################################################################
  // Update Routes
  // ##########################################################################
  /*
  | List: GET /projects/-/updates : sent [n/a]; response [object]
  | Get: GET /projects/-/updates/-/ : sent [n/a]; response [object]
  | Create: POST /projects/-/updates
  | Update: PUT /projects/-/updates/-/ : sent [object]; response [object]
  | Delete: DELETE /projects/-/updates/-/ : sent [n/a]; response [?]
  */

  app.get("/projects/:projectId/updates", UpdateController.getUpdateList);
  app.get("/projects/:projectId/updates/:updateId", UpdateController.getUpdate);
  app.post("/projects/:projectId/updates", UpdateController.createUpdate);
  //app.put('/projects/:projects/updates/:postId', UpdateController.updateUpdate);
  app.delete("/projects/:projectId/updates/:updateId", UpdateController.deleteUpdate);

  // ##########################################################################
  // Comment Routes
  // ##########################################################################
  /*
  | List: GET /projects/-/updates : sent [n/a]; response [object]
  | Get: GET /projects/-/updates/-/ : sent [n/a]; response [object]
  | Create: POST /projects/-/updates
  | Update: PUT /projects/-/updates/-/ : sent [object]; response [object]
  | Delete: DELETE /projects/-/updates/-/ : sent [n/a]; response [?]
  */

  app.get("/projects/:projectId/updates/:updateId/comments", CommentController.getUpdateCommentList);
  app.get("/projects/:projectId/updates/:updateId/comments/:commentId", CommentController.getUpdateComment);
  app.post("/projects/:projectId/updates/:updateId/comments", CommentController.createUpdateComment);
  //app.put('/projects/:projectId/updates/:updateId', CommentController.updateUpdateComment);
  app.delete("/projects/:projectId/updates/:updateId/comments/:commentId", CommentController.deleteUpdateComment);
};
