const SearchController = require('../controllers/search_controller');

module.exports = app => {
  app.get('/search/', SearchController.mvpSearch);
};
