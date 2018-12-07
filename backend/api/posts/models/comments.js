const mongoose = require('mongoose');
const { criadoEm } = require('../../../tools/criadoEm');

const CommentsSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authors',
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

criadoEm(CommentsSchema);

module.exports = mongoose.model('comments', CommentsSchema);
