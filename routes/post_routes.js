const PostController = require('../controllers/post_controller');
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

app.get('/api/v1/posts/:sort/:skip', PostController.getPosts);
app.get('/api/v1/posts/:id', PostController.getPost);
app.get('/api/v1/posts/active/:profileId', PostController.getActivePostByUser);
app.put('/api/v1/posts/:postId', PostController.updatePost);
app.get('/api/v1/posts/blog', PostController.getBlogPosts);
app.get('/api/v1/posts/community/:id/:sort', PostController.getCommunityPostList);
app.get('/api/v1/posts/project/:id/:sort', PostController.getProjectPostList);

// app.post('/api/v1/posts', PostController.createPost);
// app.put('/api/v1/posts/:postId', PostController.updatePost);
};