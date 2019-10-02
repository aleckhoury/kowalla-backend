const SearchController = require('../controllers/search');

module.exports = app => {
  app.get('/search/', SearchController.mvpSearch);
};
