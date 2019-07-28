const IntegrationController = require('../controllers/integration_controller');

module.exports = (app) => {
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

    // app.get('/api/v1/users', UserController.getUserList);
    app.get('/api/v1/integrations', IntegrationController.getIntegrations);
    app.post('/api/v1/integration', IntegrationController.createIntegration);
    // app.put('/api/v1/users/:id', UserController.updateUser);
    // app.delete('/api/v1/users/:id', UserController.deleteUser);
};
