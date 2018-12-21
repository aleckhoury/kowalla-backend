const TestController = require('../controllers/test_controller');

module.exports = (app) => {
  app.get('/', TestController.test);
}
