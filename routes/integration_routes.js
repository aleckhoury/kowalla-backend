const IntegrationController = require('../controllers/integration');

module.exports = app => {
  app.get('/integrations', IntegrationController.getIntegrations);
  app.post('/integration', IntegrationController.createIntegration);
};
