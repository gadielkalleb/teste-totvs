const { series, parallel } = require('async');

const mockData = require(path.resolve('./data_json/MOCK_DATA.json'));
const authorsData = require(path.resolve('./data_json/author.json'));
const postsData = require(path.resolve('./data_json/author.json'));
const commentsData = require(path.resolve('./data_json/author.json'));


const Author = require('../api/authors/models/authors');
const Post = require('../api/posts/models/posts');
const Comment = require('../api/posts/models/comments');

let authors, posts, comments = [];

const erroMsg = 'erro ao fazer o load do backup';

const saveAndShow = (model, array, cb) => {
  model.save((err) => {
    if (err) cb(err, null)
    console.log(`New ${model}`)
    array.push(model)
    cb(null, model)
  })
}

// const createAuthor = (name, cb) => {
//   const authorDetails = { name }
//   const author = new Author(authorDetails)
//   saveAndShow(author, authors, cb)
// }
// const createPost = (title, contentPost, author, movie_title, createdAt, comments, cb) => {
//   const postDetails = { title, contentPost, author, movie_title, createdAt, comments }
//   const post = new Post(postDetails)
//   saveAndShow(post, posts, cb)
// }
// const createComments = (author, content, cb) => {
//   const commentDetails = { author, content }
//   const comment = new Comment(commentDetails)
//   saveAndShow(comment, comments, cb)
// }

const createModel = (obj, Model, arrayData, cb) => {
  const modelDetails = obj
  const model = new Model(modelDetails)
  saveAndShow(model, arrayData, cb)
}

const generateData = (cb) => {
  parallel([])
}

module.exports = () => {

};
