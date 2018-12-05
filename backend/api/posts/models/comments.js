const mongoose = require('mongoose');
const moment = require('moment');

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

CommentsSchema.virtual('criadoEm')
  .get(function () {
    return moment(this.createdAt).format('DD-MM-YYYY');
  });


module.exports = mongoose.model('comments', CommentsSchema);
