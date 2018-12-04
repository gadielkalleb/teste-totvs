const pagination = require('../../../tools/pagination')
const axios = require('axios')
let Model;

class ModelController {
  constructor(model) {
    if (model) {
      Model = model
    }
    else console.log('no model provided')
  }

  getAll (req, res) {
    pagination(Model, {}, req.query)
      .then(results => res.send({ results }))
      .catch(err => {
        console.log(err)
        res.status(500).send(`Internal server error - ${req.path}`);
    })
  }
  
  createOne (req, res) {
    if (!req.body) {
      return res.status(400).send('wrong request');
    }

    try {
      Model.create(req.body).then(() => {

      })
      res.redirect('/Model')
    } catch (e) {
      res.render('Model/nova', {
        errors: Object.keys(e.errors)
      })
    }
  }
  
  novaForm (req, res) {
    res.render('Model/nova', {
      errors: []
    })
  }
  
  excluir (req, res) {
    await Model.remove({
      _id: req.params.id
    })
    res.redirect('back')
  }
  
  editarProcess (req, res) {
    try {
      await Model.updateOne({ _id: req.params.id }, { $set: req.body })
      res.redirect(`/info/${req.params.id}`)
    } catch (e) {
      console.log(e)
      res.render('Model/editar', {
        Model,
        errors: Object.keys(e.errors)
      })
    }
  }
  
  editarForm (req, res) {
    const Model = await Model.findOne({
      _id: req.params.id
    })
    res.render('Model/editar', {
      Model,
      
      errors: []
    })
  }
  
  info (req, res) {
    try {
      const Model = await Model.findOne({ _id: req.params.id })
      const response = await axios.get(`http://www.omdbapi.com/?t=${Model.movie_title}&apikey=3d2b356f&plot=full`)
      Model.imdbInfo = response.data
      res.render('Model/info', {
        Model
      })
    } catch (error) {
      res.render('Model/error')
    }
  }
  
  addComentario (req, res) {
    try {
      await Model.updateOne({ _id: req.params.id }, { $push: { comments: req.body } })
      res.redirect(`/info/${req.params.id}`)
    } catch(e) {
      res.render('Model/error')
    }
  }
  
}

module.exports = ModelController