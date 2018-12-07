const axios = require('axios');
const pagination = require('../../../tools/pagination');

module.exports = Model => ({
  getAll: (req, res) => {
    pagination(Model, {}, req.query)
      .then(results => res.send({ results }))
      .catch((err) => {
        console.log(err);
        res.status(500).send(`Internal server error - ${req.path}`);
      });
  },
  createOne: (req, res) => {
    if (!req.body) {
      res.status(400).send('wrong request');
    }
    Model.create(req.body)
      .then(() => res.status(200).send('success'))
      .catch((e) => {
        console.log(e);
        res.status(500).send(`Internal server error - ${req.path}`);
      });
  },
  deleteOne: (req, res) => {
    Model.remove({ _id: req.params.id })
      .then(() => res.status(200).send('success delete'))
      .catch((e) => {
        console.log(e);
        res.status(500).send(`Internal server error - ${req.path}`);
      });
  },
  editOne: (req, res) => {
    Model.updateOne({ _id: req.params.id }, { $set: req.body })
      .then(() => res.status(200).send('success'))
      .catch((e) => {
        console.log(e);
        res.status(500).send(`Internal server error - ${req.path}`);
      });
  },
  info: (req, res) => {
    Model
      .findOne({ _id: req.params.id })
      .then(async (post) => {
        const results = post;
        const response = await axios.get(`http://www.omdbapi.com/?t=${post.movie_title}&apikey=3d2b356f&plot=full`);
        res.status(200).send({ results, IMDb: !response.data ? 'not found movie' : response.data });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(`Internal server error - ${req.path}`);
      });
  },
  addComentario: (req, res) => {
    Model.updateOne({ _id: req.params.id }, { $push: { comments: req.body } })
      .then(() => {
        res.status(200).send('success');
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send(`Internal server error - ${req.path}`);
      });
  },
});
