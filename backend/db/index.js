const mongoose = require('mongoose');
const { db } = require('../config');

mongoose.Promise = require('bluebird');

function MongooseStart() {}

MongooseStart.prototype.start = () => {
  console.time('tempo de execução do mongoose');
  mongoose.connect(db.url, db.options)
    .then(() => console.log('Succeeded connected to Db!'))
    .catch((err) => {
      console.log('error connect mongoose', err);
    });
  console.timeEnd('tempo de execução do mongoose');
};

module.exports = new MongooseStart();
