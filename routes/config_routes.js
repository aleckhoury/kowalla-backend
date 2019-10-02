const ConfigController = require('../controllers/config_controller');

module.exports = app => {
  // ##########################################################################
  // User Routes
  // ##########################################################################
  /*
    | List: GET /users/ : sent [n/a]; response [object]
    | Get: GET /users/-/ : sent [n/a]; response [object]
    | Create: POST /users/
    | Update: PUT /users/-/ : sent [object]; response [object]
    | Delete: DELETE /users/-/ : sent [n/a]; response [?]
    */

  // app.get('/users', UserController.getUserList);
  // app.get('/users/:id', UserController.getUser);
  app.post('/config', ConfigController.createConfig);
  // app.put('/users/:id', UserController.updateUser);
  // app.delete('/users/:id', UserController.deleteUser);
};
