const { series, parallel } = require('async');

const { authorsData, postsData, commentsData, mockData } = require('../data_json');


const Author = require('../api/authors/models/authors');
const Post = require('../api/posts/models/posts');
// const Comment = require('../api/posts/models/comments');

// const erroMsg = 'erro ao fazer o load do backup';

const authorsArray = [];
const postsArray = [];
// const commentsArray = [];

const saveAndShow = (model, array, cb) => {
  model.save((err) => {
    if (err) return cb(err, null);
    array.push(model);
    return cb(null, model);
  });
};

const createModel = (Model, schema) => new Model(schema[Object.keys(schema)]);
const createAuthor = (schema, cb) => saveAndShow(createModel(Author, { schema }), authorsArray, cb);
const createPost = (schema, cb) => saveAndShow(createModel(Post, { schema }), postsArray, cb);


// const createComments = (author, content, cb) => {
//   const commentDetails = { author, content }
//   const comment = new Comment(commentDetails)
//   saveAndShow(comment, comments, cb)
// }

// const createModel = (obj, Model, arrayData, cb) => {
//   const modelDetails = obj;
//   const model = new Model(modelDetails);
//   saveAndShow(model, arrayData, cb);
// };

// const mountFunction = (dataMock) => {
// }

const generateAuthorData = (cb) => {
  let arrayOfFunction = [];
  authorsData.forEach((data) => {
    arrayOfFunction.push(callback => createAuthor(data, callback));
  });
  parallel(arrayOfFunction, cb);
};

const generatePostData = (cb) => {
  let arrayOfFunction = [];
  postsData.forEach((data) => {
    authorsArray.forEach((a) => {
      data.author = a._id;
    })
    arrayOfFunction.push(callback => createPost(data, callback));
  });
  parallel(arrayOfFunction, cb);
};

module.exports = () => {
  series([
    generateAuthorData,
    generatePostData,
  ], (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(results[0][0]);
  });
};
