const OAuthController = require("../controllers/oauth_controller.js");

module.exports = app => {
  app.post("/github/signin", OAuthController.authGithubUser);
  app.post("/twitter/signin", OAuthController.authTwitterUser);
  app.post("/twitter/verify", OAuthController.verifyTwitterUser);
};
