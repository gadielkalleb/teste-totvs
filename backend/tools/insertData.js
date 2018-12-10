const path = require('path');
const { MongoClient, ObjectID } = require('mongodb');

const eachInsert = require('../tools/eachInsert');

const mockData = require(path.resolve('./data_json/MOCK_DATA.json'));
const authorsData = require(path.resolve('./data_json/author.json'));

const erroMsg = 'erro ao fazer o load do backup';

module.exports = async (db) => {
  try {
    const mongo = await MongoClient.connect(db.url, db.options);
    const posts = mongo.db('meus-posts').collection('posts');
    const authors = mongo.db('meus-posts').collection('authors');

    if (await authors.find({}) <= 0) {
      eachInsert(authorsData, authors, erroMsg);
    }
    if (await posts.find({}).count() <= 0) {
      authors.find({}).toArray((err, dataSync) => {
        if (err) console.log(err);
        dataSync.forEach((data) => {
          mockData.forEach((md) => {
            if (md.author === data.name) {
              md.author = ObjectID(`${data._id}`);
            }
            md.comments.forEach((c) => {
              if (c.author === data.name) {
                c.author = ObjectID(`${data._id}`);
              }
            });
          });
        });
        eachInsert(mockData, posts, erroMsg);
      });
      console.log('load dos backup ok');
    } else {
      console.log('db já esta polulado não foi necessario carregar backup');
    }
  } catch (e) {
    console.log('erro ao processar o loading de dados ', e);
  }
};
