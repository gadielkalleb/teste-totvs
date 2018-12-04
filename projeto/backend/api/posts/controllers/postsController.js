const pagination = require('../../../tools/pagination')
const axios = require('axios')
let Posts;

class PostsController {
  constructor(model) {
    if (model) {
      Posts = model
    }
    else console.log('no model provided')
  }

  async getAll (req, res) {
    try {
      const results = await pagination(Posts, {}, req.query)
      res.render('posts/index', { results })
    } catch (error) {
      res.render('posts/error')
    }
  }
  
  async novaProcess (req, res) {
    
    try {
      await Posts.create(req.body)
      res.redirect('/posts')
    } catch (e) {
      res.render('posts/nova', {
        errors: Object.keys(e.errors)
      })
    }
  }
  
  async novaForm (req, res) {
    res.render('posts/nova', {
      errors: []
    })
  }
  
  async excluir (req, res) {
    await Posts.remove({
      _id: req.params.id
    })
    res.redirect('back')
  }
  
  async editarProcess (req, res) {
    try {
      await Posts.updateOne({ _id: req.params.id }, { $set: req.body })
      res.redirect(`/info/${req.params.id}`)
    } catch (e) {
      console.log(e)
      res.render('posts/editar', {
        posts,
        errors: Object.keys(e.errors)
      })
    }
  }
  
  async editarForm (req, res) {
    const posts = await Posts.findOne({
      _id: req.params.id
    })
    res.render('posts/editar', {
      posts,
      
      errors: []
    })
  }
  
  async info (req, res) {
    try {
      const posts = await Posts.findOne({ _id: req.params.id })
      const response = await axios.get(`http://www.omdbapi.com/?t=${posts.movie_title}&apikey=3d2b356f&plot=full`)
      posts.imdbInfo = response.data
      res.render('posts/info', {
        posts
      })
    } catch (error) {
      res.render('posts/error')
    }
  }
  
  async addComentario (req, res) {
    try {
      await Posts.updateOne({ _id: req.params.id }, { $push: { comments: req.body } })
      res.redirect(`/info/${req.params.id}`)
    } catch(e) {
      res.render('posts/error')
    }
  }
  
}

module.exports = PostsController