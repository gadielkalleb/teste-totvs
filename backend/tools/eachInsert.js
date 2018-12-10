const async = require('async');

module.exports = (data, model, errorMsg) => {
  async.eachSeries(data, (reg, callback) => {
    model.insertOne(reg, (err) => {
      if (err) {
        console.log(`${errorMsg}  =>> ${err}`);
      } else {
        callback();
      }
    });
  });
};
