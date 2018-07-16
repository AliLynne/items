const ItemsController = require('../controllers/items_controller')

module.exports = (app) => {
  // request handlers - tells our app what to do with specific requests

  // when the app gets an HTTP request with a method of GET to /api route a callback is called with two argument REQUEST (incoming request) and RESPONSE (outgoing response)

  // route = the URL the http request is being made to (http://localhost:3050/api)

  // use res to send a response to whomever made the HTTP request
  app.get('/api', ItemsController.greeting);

  app.get('/api/items/:id', ItemsController.getItem);
  app.get('/api/items', ItemsController.getList);
  app.post('/api/items', ItemsController.create);
  app.put('/api/items/:id', ItemsController.edit);
  app.delete('/api/items/:id', ItemsController.delete);
};