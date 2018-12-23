const TestController = require('../controllers/test_controller');

module.exports = (app) => {
  // ##########################################################################
  //Test routes
  // ##########################################################################
  //

  app.get('/api/test/', TestController.test);
  app.post('/api/test/', TestController.reflect);
}
