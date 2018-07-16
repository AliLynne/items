const app = require('./app');

// listen for incoming http requests from port 3050 on our local machine
app.listen(3050, () => {
  console.log('listening on port 3050');
})