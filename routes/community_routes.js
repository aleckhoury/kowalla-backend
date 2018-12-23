const CommunityController = require('../controllers/community_controller');

module.exports = (app) => {
  // ##########################################################################
  // Community Routes
  // ##########################################################################
  /*
  | List: GET /communities/ : sent [n/a]; response [object]
  | Get: GET /communities/-/ : sent [n/a]; response [object]
  | Create: POST /communities/
  | Update: PUT /communities/-/ : sent [object]; response [object]
  | Delete: DELETE /communities/-/ : sent [n/a]; response [?]
  */

  app.get('/api/v1/communities', CommunityController.getCommunityList);
  app.get('/api/v1/communities/:id', CommunityController.getCommunity);
  app.post('/api/v1/communities', CommunityController.createCommunity);
  app.put('/api/v1/communities/:id', CommunityController.updateCommunity);
  app.delete('/api/v1/communities/:id', CommunityController.deleteCommunity);
}
