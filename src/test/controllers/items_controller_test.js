const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Item = mongoose.model('item');

describe('Items controller', () => {
  it('GET request to /items returns a list of all items', done => {
    const item1 = new Item({ name: "Item 1 for list test"});
    const item2 = new Item({ name: "Item 2 for list test"});
    item1.save().then(() => {
      item2.save().then(() => {
        request(app)
          .get('/api/items')
          .end(() => {
            Item.countDocuments().then(count => {
              assert(count >= 2);
              done();
            })
          })
      })
    })
  });

  it('Post to /api/items creates a new item', done => {
    Item.countDocuments().then(count => {

      request(app)
      .post('/api/items')
      .send({ name: 'Moop meds AM' })
      .end(() => {
        Item.countDocuments().then(newCount => {
          assert(count + 1 === newCount);
          done();
        });
      });

    });
    
  });

  it('Put to /api/items/:id edits and updates an item', done => {
    const item = new Item({ name: "test item for update test" });

    item.save().then(() => {
      request(app)
        .put(`/api/items/${item._id}`)
        .send({ name: "updated test item for update test"})
        .end(() => {
          Item.findById(item._id)
            .then(item => {
              assert(item.name === "updated test item for update test");
              done();
            });
        });
    });
  });

  it('Delete request to /api/items/:id deletes the item', done => {
    const item = new Item({ name: "test item for delete test" });
    item.save().then(() => {
      request(app)
        .delete(`/api/items/${item._id}`)
        .end(() => {
          Item.findById(item._id)
            .then((item) => {
              assert(item === null);
              done();
            });
        });
      });
    });
});