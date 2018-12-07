const mongoose = require('mongoose');
const { criadoEm } = require('../../../tools/criadoEm');

const AuthorsSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments',
  }],
});

criadoEm(AuthorsSchema);

module.exports = mongoose.model('authors', AuthorsSchema);
