const _ = require('lodash');
const { series, parallel } = require('async');

const { authorsData, postsData, commentsData } = require('../data_json');

const Author = require('../api/authors/models/authors');
const Post = require('../api/posts/models/posts');
const Commentt = require('../api/posts/models/comments');

const authorsArray = [];
const postsArray = [];
const commentsArray = [];

const saveModels = (model, array, cb) => {
  model.save((err) => {
    if (err) console.log(err);
    array.push(model);
    return cb(null, model)
  });
};

// const generateData = (arrayData, matchData, create, cb) => {
//   const arrayOfFunction = [];
//   arrayData.forEach((data) => {
//     if (!matchData) {
//       arrayOfFunction.push((callback) => create(data, callback));
//     } else {
//       matchData.forEach(mt => {
//         if (data.author === mt.name) {
//           data.author = mt._id;
//         }
//         arrayOfFunction.push((callback) => create(data, callback));
//       });
//     }
//     parallel(arrayOfFunction, cb);
//   });
// }

const createModel = (Model, schema) => new Model(schema[Object.keys(schema)]);

const createAuthor = (schema, cb) => saveModels(createModel(Author, { schema }), authorsArray, cb)
const createPost = (schema, cb) => saveModels(createModel(Post, { schema }), postsArray, cb);
const createComments = (schema, cb) => saveModels(createModel(Commentt, { schema }), commentsArray, cb);

// const generateAuthorData = (cbg) => generateData(authorsData, null, createAuthor, cbg);
// const generatePostData = (cbg) => generateData(postsData, authorsArray, createPost, cbg);
// const generateCommentData = (cbg) => generateData(commentsData, authorsArray, createComments, cbg);

function generateAuthorData(cb) {
  let arrayOfFunction = [];
  authorsData.forEach((data) => {
    arrayOfFunction.push(callback => createAuthor(data, callback));
  });
  parallel(arrayOfFunction, cb);
};

function generatePostData (cb) {
  let arrayOfFunction = [];
  postsData.forEach((data) => {
    authorsArray.forEach((a) => {
      if (data.author === a.name) {
        data.author = a._id;
      }
    })
    arrayOfFunction.push(callback => createPost(data, callback));
  });
  parallel(arrayOfFunction, cb);
};

function generateCommentData(cb) {
  let arrayOfFunction = [];
  Object.values(authorsArray).forEach(a => {
    commentsData.map(data => {
      data.map(d => {
        if (a.name === d.author) {
          d.author = a._id;
        }
      });
    });
  });
  commentsData.forEach(data => {
    arrayOfFunction.push((callback) => createComments(data, callback))
  })
  parallel(arrayOfFunction, cb);
};

module.exports = async () => {
  if (await Post.countDocuments({}) <= 0) {
    series([
      generateAuthorData,
      generatePostData,
      generateCommentData,
    ], (err) => {
      if (err) {
        console.log(err);
      }
      console.log('backup realizado com sucesso!!!!');
    });
  } else {
    console.log('não foi necessario realizar o backup, banco de dados esta populado');
  }
}
