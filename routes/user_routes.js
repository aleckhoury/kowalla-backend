const UserController = require('../controllers/user_controller');

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
    // app.get('/api/v1/users/:id', UserController.getUser);
    // app.post('/api/v1/users/register', UserController.register);
    app.post('/api/v1/users/login', UserController.authUser);
    // app.get('/api/v1/users/me', UserController.me);
    app.post('/api/v1/users', UserController.createUser);
    // app.put('/api/v1/users/:id', UserController.updateUser);
    // app.delete('/api/v1/users/:id', UserController.deleteUser);
}
