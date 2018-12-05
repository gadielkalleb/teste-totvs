const Crud = require('../../../tools/crud');

class User extends Crud {
  constructor(model) {
    super();
    this.Model = model;
  }
}

module.exports = User;
