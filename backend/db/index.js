const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

function MongooseStart() {}

MongooseStart.prototype.start = (db) => {
  console.time('tempo de execução do mongoose');
  return new Promise((resolve, reject) => {
    mongoose.connect(db.url, db.options, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
    console.timeEnd('tempo de execução do mongoose');
  });
};

module.exports = new MongooseStart();
