const mongoose = require('mongoose')
const moment = require('moment')

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  contentPost: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  movie_title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  comments: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId
    },
    author: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
  }]
})

PostSchema.virtual('criadoEm')
  .get(function () {
    return moment(this.createdAt).format('DD-MM-YYYY');
  })


module.exports = mongoose.model('posts', PostSchema)