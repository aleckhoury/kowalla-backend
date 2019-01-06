const CommunityController = require('../controllers/community_controller');
const PostController = require('../controllers/post_controller');

module.exports = (app) => {
  // ##########################################################################
  // General Community Routes
  // ##########################################################################
  /*
  | List: GET /communities/ : sent [n/a]; response [object]
  | Get: GET /communities/-/ : sent [n/a]; response [object]
  | Create: POST /communities/
  | Update: PUT /communities/-/ : sent [object]; response [object]
  | Delete: DELETE /communities/-/ : sent [n/a]; response [?]
  */

  app.get('/api/v1/communities', CommunityController.getCommunityList);
  app.get('/api/v1/communities/:communityId', CommunityController.getCommunity);
  app.post('/api/v1/communities', CommunityController.createCommunity);
  app.put('/api/v1/communities/:communityId', CommunityController.updateCommunity);
  app.delete('/api/v1/communities/:communityId', CommunityController.deleteCommunity);

  // ##########################################################################
  // Post Routes
  // ##########################################################################
  /*
  | List: GET /communities/-/posts : sent [n/a]; response [object]
  | Get: GET /communities/-/posts/-/ : sent [n/a]; response [object]
  | Create: POST /communities/-/posts
  | Update: PUT /communities/-/posts/-/ : sent [object]; response [object]
  | Delete: DELETE /communities/-/posts/-/ : sent [n/a]; response [?]
  */

  app.get('/api/v1/communities/:communityId/posts', PostController.getCommunityPostList;
  app.get('/api/v1/communities/:communityId/posts/:postId', PostController.getPost);
  app.post('/api/v1/communities/:communityId/posts', PostController.createPost);
  //app.put('/api/v1/communities/:communityId/posts/:postId', PostController.updateCommunity);
  app.delete('/api/v1/communities/:communityId/posts/:postId', PostController.deletePost);

}
