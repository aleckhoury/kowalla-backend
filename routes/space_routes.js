const SpaceController = require('../controllers/space_controller');
const PostController = require('../controllers/post_controller');
const CommentController = require('../controllers/comment_controller');

module.exports = (app) => {
  // ##########################################################################
  // General Space Routes
  // ##########################################################################
  /*
  | List: GET /spaces/ : sent [n/a]; response [object]
  | Get: GET /spaces/-/ : sent [n/a]; response [object]
  | Create: POST /spaces/
  | Update: PUT /spaces/-/ : sent [object]; response [object]
  | Delete: DELETE /spaces/-/ : sent [n/a]; response [?]
  */

  app.get('/api/v1/spaces', SpaceController.getSpaceList);
  app.get('/api/v1/spaces/:spaceId', SpaceController.getSpace);
  app.post('/api/v1/spaces', SpaceController.createSpace);
  app.put('/api/v1/spaces/:spaceId', SpaceController.updateSpace);
  app.delete('/api/v1/spaces/:spaceId', SpaceController.deleteSpace);


  app.get('/api/v1/spaces/space/:spaceName', SpaceController.getSpaceByName);
  // ##########################################################################
  // Post Routes
  // ##########################################################################
  /*
  | List: GET /spaces/-/posts : sent [n/a]; response [object]
  | Get: GET /spaces/-/posts/-/ : sent [n/a]; response [object]
  | Create: POST /spaces/-/posts
  | Update: PUT /spaces/-/posts/-/ : sent [object]; response [object]
  | Delete: DELETE /spaces/-/posts/-/ : sent [n/a]; response [?]
  */
  app.get('/api/v1/space/posts/:spaceId/:sort/:skip', PostController.getSpacePostList);
  app.get('/api/v1/spaces/:spaceId/posts/:postId', PostController.getPost);
  // app.post('/api/v1/spaces/:spaceId/posts', PostController.createPost);
  //app.put('/api/v1/spaces/:spaceId/posts/:postId', PostController.updatePost);

  // ##########################################################################
  // Comment Routes
  // ##########################################################################
  /*
  | List: GET /spaces/-/posts : sent [n/a]; response [object]
  | Get: GET /spaces/-/posts/-/ : sent [n/a]; response [object]
  | Create: POST /spaces/-/posts
  | Update: PUT /spaces/-/posts/-/ : sent [object]; response [object]
  | Delete: DELETE /spaces/-/posts/-/ : sent [n/a]; response [?]
  */

  app.get('/api/v1/spaces/:spaceId/posts/:postId/comments', CommentController.getPostCommentList);
  app.get('/api/v1/spaces/:spaceId/posts/:postId/comments/:commentId', CommentController.getPostComment);
  app.post('/api/v1/spaces/:spaceId/posts/:postId/comments', CommentController.createPostComment);
  //app.put('/api/v1/spaces/:spaceId/posts/:postId', CommentController.updatePostComment);
  app.delete('/api/v1/spaces/:spaceId/posts/:postId/comments/:commentId', CommentController.deletePostComment);

}
