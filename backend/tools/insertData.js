/* eslint-disable no-param-reassign */
const path = require('path');
const { MongoClient, ObjectID } = require('mongodb');
const { waterfall } = require('async');

const { eachInsert } = require('./');

const mockData = require(path.resolve('./data_json/MOCK_DATA.json'));
const authorsData = require(path.resolve('./data_json/author.json'));

const erroMsg = 'erro ao fazer o load do backup';

module.exports = (db) => {
  MongoClient.connect(db.url, db.options).then((mongo) => {
    const posts = mongo.db('meus-posts').collection('posts');
    const authors = mongo.db('meus-posts').collection('authors');
    waterfall([
      (callback) => {
        authors.countDocuments({})
          .then((docs) => {
            if (docs <= 0) {
              eachInsert(authorsData, authors, erroMsg);
              callback(null);
            }
          }).catch(err => callback(err));
      },
      (callback) => {
        authors.find({}).toArray((err, dataA) => {
          if (err) callback(err);
          posts.find({}).toArray((err, dataPosts) => {
            if (err) callback(err);
            if (dataPosts.length <= 0) {
              dataA.forEach((data) => {
                mockData.map((md) => {
                  md.comments.map((mdc) => {
                    if (md.author === data.name) {
                      md.author = ObjectID(`${data._id}`);
                    } else if (mdc.author === data.name) {
                      mdc.author = ObjectID(`${data._id}`);
                    }
                  });
                });
              });
              console.log('backup carregado com sucesso');
              callback(null, mockData);
            } else {
              console.log('não houve necessidade de carregar o backup');
            }
          });
        })
      },
    ], (err, mock) => {
      if (err) console.log(err);
      eachInsert(mock, posts, erroMsg);
    });
  });

  // try {
  //   if (await authors.countDocuments({}) <= 0) {
  //     eachInsert(authorsData, authors, erroMsg);
  //   }
  //   if (await posts.countDocuments({}) <= 0) {
  //     const dataSync = await authors.find({});

  //     mockData.map(md => dataSync.forEach((data) => {
  //       if (data.name === md.author) {
  //         tranformNameId(data, md);
  //       }
  //       md.comments.forEach((c) => {
  //         if (data.name === c.author) {
  //           tranformNameId(data, c);
  //         }
  //       });
  //     }));
  //     eachInsert(mockData, posts, erroMsg);
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
};
