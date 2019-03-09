const UpvoteController = require('../controllers/upvote_controller');

module.exports = (app) => {
// ##########################################################################
// General Community Routes
// ##########################################################################
    /*
    | List: GET /communities/ : sent [n/a]; response [object]
    | Get: GET /communities/-/ : sent [n/a]; response [object]
    | Create: POST /communities/
    | Update: PUT /communities/-/ : sent [object]; response [object]
    | Delete: DELETE /communities/-/ : sent [n/a]; response [?]
    */

    // app.get('/api/v1/reactions/:postId', UpvoteController.getReactionList);
    // app.get('/api/v1/upvotes/count/:commentId', UpvoteController.getUpvoteCount);
    app.get('/api/v1/upvotes/:commentId/:profileId', UpvoteController.getUpvote);
    app.post('/api/v1/upvotes/:profileId', UpvoteController.createUpvote);
    app.delete('/api/v1/upvotes/:profileId/:commentId', UpvoteController.deleteUpvote);
}