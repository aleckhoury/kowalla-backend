const CommentController = require('../controllers/comment_controller');

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

    app.get('/api/v1/comments/:postId', CommentController.getPostCommentList);
    app.get('/api/v1/comments/:postId/:commentId', CommentController.getCommentReplyList);
    // app.get('/api/v1/comments/:id', CommentController.getPost);
    app.post('/api/v1/comments', CommentController.createPostComment);
// app.put('/api/v1/posts/:postId', PostController.updatePost);
};