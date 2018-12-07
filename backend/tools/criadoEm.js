const moment = require('moment');

module.exports = {
  criadoEm: (schema) => {
    schema.virtual('criadoEm')
      .get(function () {
        return moment(this.createdAt).format('DD-MM-YYYY');
      });
  },
};
