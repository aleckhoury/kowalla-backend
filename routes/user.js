const UserController = require('../controllers/user');
const ProfileController = require('../controllers/profile');

module.exports = app => {
  // app.get('/users', UserController.getUserList);
  // app.get('/users/:id', UserController.getUser);
  app.get('/users/:username', ProfileController.getProfileOnLoad);
  app.post('/users/login', UserController.authUser);
  app.post('/users', UserController.createUser);
  // app.put('/users/:id', UserController.updateUser);
  // app.delete('/users/:id', UserController.deleteUser);
};
