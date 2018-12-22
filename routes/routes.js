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

  app.get('/api/profiles', ProfileController.getProfileList);
  app.get('/api/profiles/:id', ProfileController.getProfile);
  app.post('/api/profiles', ProfileController.createProfile);
  app.put('/api/profiles/:id', ProfileController.updateProfile);
  app.delete('/api/profiles/:id', ProfileController.deleteProfile);

}
