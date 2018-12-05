const mongoose = require('mongoose');
const moment = require('moment');

const UsersSchema = new mongoose.Schema({
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

UsersSchema.virtual('criadoEm')
  .get(function () {
    return moment(this.createdAt).format('DD-MM-YYYY');
  });


module.exports = mongoose.model('users', UsersSchema);
