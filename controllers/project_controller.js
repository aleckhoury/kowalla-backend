// Dependencies

// Models

module.exports = {
  getProjectList(req, res, next) {
    res.send({ function: 'getProjectList' });
  },

  getProject(req, res, next) {
    res.send({ function: 'getProject' });
  },

  createProject(req, res, next) {
    res.send({ function: 'createProject' });
  },

  updateProject(req, res, next) {
    res.send({ function: 'updateProject' });
  },

  deleteProject(req, res, next) {
    res.send({ function: 'deleteProject' });
  },
}
