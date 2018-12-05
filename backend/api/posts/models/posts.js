const mongoose = require('mongoose');
const moment = require('moment');

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
    type: String,
    required: true,
  },
  movie_title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments',
  }],
});

PostSchema.virtual('criadoEm')
  .get(function () {
    return moment(this.createdAt).format('DD-MM-YYYY');
  });


module.exports = mongoose.model('posts', PostSchema);
