const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

function MongooseStart() {}

MongooseStart.prototype.start = db => new Promise((resolve, reject) => {
  mongoose.connect(db.url, db.options, (err) => {
    if (err) {
      return reject(err);
    }
    console.log(`conectado ao mongodb ${db.url}`);
    return resolve();
  });
});

module.exports = new MongooseStart();
