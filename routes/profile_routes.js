const ProfileController = require('../controllers/profile_controller');
const SubscriptionController = require('../controllers/subscription_controller');
const UpvoteController = require('../controllers/upvote_controller');
const ReactionController = require('../controllers/reaction_controller');
const PostController = require('../controllers/post_controller');
const NotificationController = require('../controllers/notification_controller');
const IntegrationController = require('../controllers/integration_controller');

module.exports = (app) => {
  // Profile Routes
  app.get('/api/v1/profiles', ProfileController.getProfileList);
  app.get('/api/v1/profiles/:profileId', ProfileController.getProfile);
  app.post('/api/v1/profiles', ProfileController.createProfile);
  app.put('/api/v1/profiles/:profileId', ProfileController.updateProfile);
  app.delete('/api/v1/profiles/:profileId', ProfileController.deleteProfile);
  app.get('/api/v1/profiles/user/:username', ProfileController.getProfileByUsername);

  // Subscription Routes
  app.get('/api/v1/profiles/user/:username/subs', SubscriptionController.getSubscriptionList);
  app.get('/api/v1/profiles/:profileId/subs', SubscriptionController.getSubscriptionList);
  app.get('/api/v1/profiles/:profileId/subs/:type/:typeId', SubscriptionController.getSubscription);
  app.post('/api/v1/profiles/:profileId/subs', SubscriptionController.createSubscription);
  app.delete('/api/v1/profiles/:profileId/subs/:type/:typeId', SubscriptionController.deleteSubscription);

  // Upvote Routes
  app.get('/api/v1/profiles/:profileId/upvotes', UpvoteController.getUpvoteList);
  app.get('/api/v1/profiles/:profileId/upvotes/:commentId', UpvoteController.getUpvote);
  //app.get('/api/v1/profiles/:profileId/upvotes/:postId', UpvoteController.getUpvoteListForPost); // would get us all the upvotes within a post, which lessens call volume
  app.post('/api/v1/profiles/:profileId/upvotes', UpvoteController.createUpvote);
  app.delete('/api/v1/profiles/:profileId/upvotes/:commentId', UpvoteController.deleteUpvote);

  // Reaction Routes
  app.get('/api/v1/profiles/:profileId/reactions', ReactionController.getReactionList);
  app.get('/api/v1/profiles/:profileId/reactions/:type/:typeId', ReactionController.getReaction);
  app.post('/api/v1/profiles/:profileId/reactions', ReactionController.createReaction);
  app.delete('/api/v1/profiles/:profileId/reactions/:postId', ReactionController.deleteReaction);
  app.put('/api/v1/profile/posts/:postId', PostController.updatePost);
  app.get('/api/v1/profile/posts/:profileId/:sort/:skip', PostController.getProfilePostList);

  // Notification Routes
  app.put('/api/v1/profile/posts/:postId', PostController.updatePost);
  app.post('/api/v1/profiles/:profileId/notifications', NotificationController.getNotificationsList);
  app.delete('/api/v1/profiles/:profileId/notifications', NotificationController.deleteArrayOfNotifs);

  // Integration Routes
  app.put('/api/v1/profile/:profileId/integrations', ProfileController.toggleIntegration);

  //app.get('/api/v1/profiles/:profileId/rep', ProfileController.getProfileReputation);


};
