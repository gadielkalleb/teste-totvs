const axios = require('axios');
const Crud = require('../../../tools/crud')

class PostController extends Crud{
  constructor (model) {
    super()
    this.Model = model
  }

  info(req, res) {
    this.Model.findOne({
        _id: req.params.id
      })
      .then(results => {
        axios.get(`http://www.omdbapi.com/?t=${results.movie_title}&apikey=3d2b356f&plot=full`)
          .then(response => {
            this.Model.imdbInfo = response.data
            res.status(200).send(Model)
          })
      }).catch(err => {
        res.status(500).send(`Internal server error - ${req.path}`);
      })
  }

  addComentario (req, res) {
    this.Model.updateOne({ _id: req.params.id }, { $push: { comments: req.body } })
        .then(() => {
          res.status(200).send('success')
        })
    .catch(e => {
      res.status(500).send(`Internal server error - ${req.path}`);
    })
  }
}

module.exports = PostController;