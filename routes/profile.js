const ProfileController = require('../controllers/profile');
const SubscriptionController = require('../controllers/subscription');
const UpvoteController = require('../controllers/upvote');
const ReactionController = require('../controllers/reaction');
const PostController = require('../controllers/post');
const NotificationController = require('../controllers/notification');

module.exports = app => {
  // Profile Routes
  app.get('/profiles', ProfileController.getProfileList);
  app.get('/profiles/:profileId', ProfileController.getProfile);
  app.post('/profiles', ProfileController.createProfile);
  app.put('/profiles/:profileId', ProfileController.updateProfile);
  app.delete('/profiles/:profileId', ProfileController.deleteProfile);
  app.get('/profiles/user/:username', ProfileController.getProfileByUsername);
  app.get('/users/onboarding', ProfileController.getAllSubscriptionOptions);

  // Subscription Routes
  app.get('/profiles/user/:username/subs', SubscriptionController.getSubscriptionList);
  app.get('/profiles/:profileId/subs', SubscriptionController.getSubscriptionList);
  app.get('/profiles/:profileId/subs/:type/:typeId', SubscriptionController.getSubscription);
  app.get('/profiles/subs/default', SubscriptionController.getDefaultSubs);
  app.post('/profiles/:profileId/subs', SubscriptionController.createSubscription);
  app.delete('/profiles/:profileId/subs/:type/:typeId', SubscriptionController.deleteSubscription);

  // Upvote Routes
  app.get('/profiles/:profileId/upvotes', UpvoteController.getUpvoteList);
  app.get('/profiles/:profileId/upvotes/:commentId', UpvoteController.getUpvote);
  app.post('/profiles/:profileId/upvotes', UpvoteController.createUpvote);
  app.delete('/profiles/:profileId/upvotes/:commentId', UpvoteController.deleteUpvote);

  // Reaction Routes
  app.get('/profiles/:profileId/reactions', ReactionController.getReactionList);
  app.get('/profiles/:profileId/reactions/:type/:typeId', ReactionController.getReaction);
  app.post('/profiles/:profileId/reactions', ReactionController.createReaction);
  app.delete('/profiles/:profileId/reactions/:postId', ReactionController.deleteReaction);
  app.put('/profile/posts/:postId', PostController.updatePost);
  app.get('/profile/posts/:profileId/:sort/:skip', PostController.getProfilePostList);

  // Notification Routes
  app.post('/profiles/:profileId/notifications', NotificationController.getNotificationsList);
  app.delete('/profiles/:profileId/notifications', NotificationController.deleteArrayOfNotifs);

  // Integration Routes
  app.put('/profile/:profileId/integrations', ProfileController.toggleIntegration);
};
