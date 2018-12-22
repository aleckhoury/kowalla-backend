module.exports = {
  getProfileList(req, res, next) {
    res.send({ function: 'getProfileList' });
  },

  getProfile(req, res, next) {
    res.send({ function: 'getProfile' });
  },

  createProfile(req, res, next) {
    res.send({ function: 'createProfile' });
  },

  updateProfile(req, res, next) {
    res.send({ function: 'updateProfile' });
  },

  deleteProfile(req, res, next) {
    res.send({ function: 'deleteProfile' });
  },
}
