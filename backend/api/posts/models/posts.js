const mongoose = require('mongoose');

const { criadoEm } = require('../../../tools');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contentPost: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authors',
  },
  movie_title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments',
  },
});

criadoEm(PostSchema);
module.exports = mongoose.model('posts', PostSchema);
