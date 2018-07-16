const mongoose = require('mongoose');
const URI = process.env.TEST_DB_URI;
const options = { useNewUrlParser: true }

before(done => {
  console.log(URI)
  mongoose.connect(URI, options);
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', err)
    })
})

beforeEach(done => {
  const { items } = mongoose.connection.collections;
  items.drop()
    .then(() => done())
    .catch(() => done());
})