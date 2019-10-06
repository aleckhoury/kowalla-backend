const SpaceController = require('../controllers/space');
const PostController = require('../controllers/post');
const CommentController = require('../controllers/comment');

module.exports = app => {
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

  app.get('/spaces', SpaceController.getSpaceList);
  app.get('/spaces/:spaceId', SpaceController.getSpace);
  app.post('/spaces', SpaceController.createSpace);
  app.put('/spaces/:spaceId', SpaceController.updateSpace);
  app.delete('/spaces/:spaceId', SpaceController.deleteSpace);

  app.get('/spaces/space/:spaceName', SpaceController.getSpaceByName);
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
  app.get('/space/posts/:spaceId/:sort/:skip', PostController.getSpacePostList);
  app.get('/spaces/:spaceId/posts/:postId', PostController.getPost);
  // app.post('/spaces/:spaceId/posts', PostController.createPost);
  //app.put('/spaces/:spaceId/posts/:postId', PostController.updatePost);

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

  app.get('/spaces/:spaceId/posts/:postId/comments', CommentController.getPostCommentList);
  app.get('/spaces/:spaceId/posts/:postId/comments/:commentId', CommentController.getPostComment);
  app.post('/spaces/:spaceId/posts/:postId/comments', CommentController.createPostComment);
  //app.put('/spaces/:spaceId/posts/:postId', CommentController.updatePostComment);
  app.delete('/spaces/:spaceId/posts/:postId/comments/:commentId', CommentController.deletePostComment);
};
