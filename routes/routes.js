const TestController = require('../controllers/test_controller');
const ProfileController = require('../controllers/profile_controller');

module.exports = (app) => {

  // ##########################################################################
  //Test routes
  // ##########################################################################
  //

  app.get('/api/test/', TestController.test);
  app.post('/api/test/', TestController.reflect);

  // ##########################################################################
  // Profile Routes
  // ##########################################################################
  /*
  | List: GET /profiles/ : sent [n/a]; response [object]
  | Get: GET /profiles/-/ : sent [n/a]; response [object]
  | Create: POST /profiles/
  | Update: PUT /profiles/-/ : sent [object]; response [object]
  | Delete: DELETE /profiles/-/ : sent [n/a]; response [?]
  */

  app.get('/api/v1/profiles', ProfileController.getProfileList);
  app.get('/api/v1/profiles/:id', ProfileController.getProfile);
  app.post('/api/v1/profiles', ProfileController.createProfile);
  app.put('/api/v1/profiles/:id', ProfileController.updateProfile);
  app.delete('/api/v1/profiles/:id', ProfileController.deleteProfile);

  // ##########################################################################
  // Project Routes
  // ##########################################################################
  /*
  | List: GET /projects/ : sent [n/a]; response [object]
  | Get: GET /projects/-/ : sent [n/a]; response [object]
  | Create: POST /projects/
  | Update: PUT /projects/-/ : sent [object]; response [object]
  | Delete: DELETE /projects/-/ : sent [n/a]; response [?]
  */

  app.get('/api/v1/projects', ProjectController.getProjectList);
  app.get('/api/v1/projects/:id', ProjectController.getProject);
  app.post('/api/v1/projects', ProjectController.createProject);
  app.put('/api/v1/projects/:id', ProjectController.updateProject);
  app.delete('/api/v1/projects/:id', ProjectController.deleteProject);

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
