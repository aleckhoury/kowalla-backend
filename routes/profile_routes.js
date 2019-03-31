const ProfileController = require('../controllers/profile_controller');
const SubscriptionController = require('../controllers/subscription_controller');
const UpvoteController = require('../controllers/upvote_controller');
const ReactionController = require('../controllers/reaction_controller');
const PostController = require('../controllers/post_controller');

module.exports = (app) => {
  // ##########################################################################
  // General Profile Routes
  // ##########################################################################
  /*
  | List: GET /profiles/ : sent [n/a]; response [object]
  | Get: GET /profiles/-/ : sent [n/a]; response [object]
  | Create: POST /profiles/
  | Update: PUT /profiles/-/ : sent [object]; response [object]
  | Delete: DELETE /profiles/-/ : sent [n/a]; response [?]
  */

  app.get('/api/v1/profiles', ProfileController.getProfileList);
  app.get('/api/v1/profiles/:profileId', ProfileController.getProfile);
  app.post('/api/v1/profiles', ProfileController.createProfile);
  app.put('/api/v1/profiles/:profileId', ProfileController.updateProfile);
  app.delete('/api/v1/profiles/:profileId', ProfileController.deleteProfile);

  // by username
  app.get('/api/v1/profiles/u/:username', ProfileController.getProfileByUsername);

  // ##########################################################################
  // Subscription Routes
  // ##########################################################################
  /*
  | List: GET /profiles/-/subs : sent [n/a]; response [object]
  | Get: GET /profiles/-/subs/-/ : sent [n/a]; response [object]
  | Create: POST /profiles/-/subs/
  | Delete: DELETE /profiles/-/subs/-/ : sent [n/a]; response [?]

  profileId: the id of the user
  type: either 'communities' or 'projects'
  typeId: is the id of the community or the project
  */
  app.get('/api/v1/profiles/u/:username/subs', SubscriptionController.getSubscriptionList);

  app.get('/api/v1/profiles/:profileId/subs', SubscriptionController.getSubscriptionList);
  app.get('/api/v1/profiles/:profileId/subs/:type/:typeId', SubscriptionController.getSubscription);
  app.post('/api/v1/profiles/:profileId/subs', SubscriptionController.createSubscription);
  app.delete('/api/v1/profiles/:profileId/subs/:type/:typeId', SubscriptionController.deleteSubscription);

  // ##########################################################################
  // Upvote Routes
  // ##########################################################################
  /*
  | List: GET /profiles/-/upvotes : sent [n/a]; response [object]
  | Get: GET /profiles/-/upvotes/-/ : sent [n/a]; response [object]
  | Create: POST /profiles/-/upvotes/
  | Delete: DELETE /profiles/-/upvotes/-/ : sent [n/a]; response [?]
  */

  app.get('/api/v1/profiles/:profileId/upvotes', UpvoteController.getUpvoteList);
  app.get('/api/v1/profiles/:profileId/upvotes/:commentId', UpvoteController.getUpvote);
  //app.get('/api/v1/profiles/:profileId/upvotes/:postId', UpvoteController.getUpvoteListForPost); // would get us all the upvotes within a post, which lessens call volume
  app.post('/api/v1/profiles/:profileId/upvotes', UpvoteController.createUpvote);
  app.delete('/api/v1/profiles/:profileId/upvotes/:commentId', UpvoteController.deleteUpvote);

  // ##########################################################################
  // Reaction Routes
  // ##########################################################################
  /*
  | List: GET /profiles/-/reactions : sent [n/a]; response [object]
  | Get: GET /profiles/-/reactions/-/ : sent [n/a]; response [object]
  | Create: POST /profiles/-/reactions/
  | Delete: DELETE /profiles/-/reactions/-/ : sent [n/a]; response [?]
  */
  app.get('/api/v1/profiles/:profileId/reactions', ReactionController.getReactionList);
  app.get('/api/v1/profiles/:profileId/reactions/:type/:typeId', ReactionController.getReaction);
  app.post('/api/v1/profiles/:profileId/reactions', ReactionController.createReaction);
  app.delete('/api/v1/profiles/:profileId/reactions/:postId', ReactionController.deleteReaction);

  // ##########################################################################
  // Post Routes
  // ##########################################################################
  /*
  | List: GET /profiles/-/posts : sent [n/a]; response [object]
  */

  app.get('/api/v1/profiles/:profileId/posts', PostController.getProfilePostList);


  //app.get('/api/v1/profiles/:profileId/rep', ProfileController.getProfileReputation);


}
