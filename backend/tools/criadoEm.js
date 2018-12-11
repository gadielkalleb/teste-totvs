const moment = require('moment');

module.exports = (schema) => {
  schema.virtual('criadoEm')
    .get(function () {
      return moment(this.createdAt).format('DD-MM-YYYY');
    });
};
