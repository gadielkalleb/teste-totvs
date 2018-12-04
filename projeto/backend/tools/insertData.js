const _async = require('async');
const { MongoClient } = require('mongodb')
const { db } = require('../config')
const data = require('../data_json/MOCK_DATA.json')

const mongodb = (db) => new Promise((resolve,reject) => {
  MongoClient.connect(db.url, db.options,(err,mdb) => {
      if(err) return reject(err);
      resolve(mdb);
  });
});

module.exports = () => {
  mongodb(db)
    .then(mongo => {
      let posts = mongo.db().collection('posts');
      if (posts.find().count() <= 0) {
        _async.eachSeries(data, (reg, callback) => {
          posts.insertOne(reg, err => {
            if (err) {
              console.log('err loading data from json', err)
            } else {
              callback();
            }
          })
        })
      } else {
        console.log('db já esta polulado não é necessario carregar backup')
      }
    })
    .catch(e => console.log('erro ao processar o loding de dados ', e))
}
