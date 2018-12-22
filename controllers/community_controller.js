module.exports = {
  getCommunityList(req, res, next) {
    res.send({ function: 'getCommunityList' });
  },

  getCommunity(req, res, next) {
    res.send({ function: 'getCommunity' });
  },

  createCommunity(req, res, next) {
    res.send({ function: 'createCommunity' });
  },

  updateCommunity(req, res, next) {
    res.send({ function: 'updateCommunity' });
  },

  deleteCommunity(req, res, next) {
    res.send({ function: 'deleteCommunity' });
  },
}
