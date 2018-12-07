const mongoose = require('mongoose');
const { criadoEm } = require('../../../tools/criadoEm');

const AuthorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments',
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

criadoEm(AuthorsSchema);

module.exports = mongoose.model('authors', AuthorsSchema);
