const ProjectController = require('../controllers/project_controller');
const PostController = require('../controllers/post_controller');
const UpdateController = require('../controllers/update_controller');

module.exports = (app) => {
  // ##########################################################################
  // Project Routes
  // ##########################################################################
  /*
  | List: GET /projects/ : sent [n/a]; response [object]
  | Get: GET /projects/-/ : sent [n/a]; response [object]
  | Create: POST /projects/
  | Update: PUT /projects/-/ : sent [object]; response [object]
  | Delete: DELETE /projects/-/ : sent [n/a]; response [?]
  */

  app.get('/api/v1/projects', ProjectController.getProjectList);
  app.get('/api/v1/projects/:id', ProjectController.getProject);
  app.post('/api/v1/projects', ProjectController.createProject);
  app.put('/api/v1/projects/:id', ProjectController.updateProject);
  app.delete('/api/v1/projects/:id', ProjectController.deleteProject);

  // ##########################################################################
  // Post Routes
  // ##########################################################################
  /*
  | List: GET /projects/-/posts : sent [n/a]; response [object]
  */

  app.get('/api/v1/projects/:projectId/posts', PostController.getProjectPostList);

  // ##########################################################################
  // Update Routes
  // ##########################################################################
  /*
  | List: GET /projects/-/updates : sent [n/a]; response [object]
  | Get: GET /projects/-/updates/-/ : sent [n/a]; response [object]
  | Create: POST /projects/-/updates
  | Update: PUT /projects/-/updates/-/ : sent [object]; response [object]
  | Delete: DELETE /projects/-/updates/-/ : sent [n/a]; response [?]
  */

  app.get('/api/v1/projects/:projectId/updates', UpdateController.getUpdateList);
  app.get('/api/v1/projects/:projectId/updates/:updateId', UpdateController.getUpdate);
  app.post('/api/v1/projects/:projectId/updates', UpdateController.createUpdate);
  //app.put('/api/v1/projects/:projects/updates/:postId', UpdateController.updateUpdate);
  app.delete('/api/v1/projects/:projectId/updates/:updateId', UpdateController.deleteUpdate);

}
