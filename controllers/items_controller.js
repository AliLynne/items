const Item = require('../models/item');

module.exports = {
  greeting(req, res) {
    console.log("greeting");
    res.send({ hi: 'there' });
  },

  getList(req, res, next) {
    Item.find({})
      .then(list => res.send(list))
      .catch(next);
  },

  getItem(req, res, next) {
    const itemProps = req.params.id;
    Item.findById(itemProps)
      .then(item => res.send(item))
      .catch(next);
  },

  create(req, res, next) {
    const itemProps = req.body;

    Item.create(itemProps)
      .then(item => res.send(item))
      .catch(next);
  },

  edit(req, res, next) {
    const itemId = req.params.id;
    const itemProps = req.body;
    Item.findByIdAndUpdate({ _id : itemId}, itemProps, { new: true })
      .then(item => res.send(item))
      .catch(next);
  },

  delete(req, res, next) {
    const itemId = req.params.id;
    Item.findByIdAndRemove(itemId)
      .then(item => res.status(204).send(item))
      .catch(next);
  }
};