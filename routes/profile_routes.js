const ProfileController = require('../controllers/profile_controller');

module.exports = (app) => {
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
}
