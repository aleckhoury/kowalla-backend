const UserController = require('../controllers/user_controller');
const ProfileController = require('../controllers/profile_controller');

module.exports = (app) => {
    // app.get('/api/v1/users', UserController.getUserList);
    // app.get('/api/v1/users/:id', UserController.getUser);
    app.get('/api/v1/users/:username', ProfileController.getProfileOnLoad);
    app.post('/api/v1/users/login', UserController.authUser);
    app.post('/api/v1/users', UserController.createUser);
    // app.put('/api/v1/users/:id', UserController.updateUser);
    // app.delete('/api/v1/users/:id', UserController.deleteUser);
};
