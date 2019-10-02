const IntegrationController = require("../controllers/integration_controller");

module.exports = app => {
  app.get("/integrations", IntegrationController.getIntegrations);
  app.post("/integration", IntegrationController.createIntegration);
};
