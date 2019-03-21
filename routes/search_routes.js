const SearchController = require('../controllers/search_controller');

module.exports = (app) => {
  app.get('/api/v1/search/', SearchController.mvpSearch)
}
