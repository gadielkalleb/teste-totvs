const jwt = require('jsonwebtoken');
const Crud = require('../../../tools/crud');
const { jwtSecret } = require('../../../config');

class AuthorsController extends Crud {
  constructor(model) {
    super();
    this.Model = model;
    this.jwt = jwt;
  }

  authauthors(req, res) {
    this.jwt
      .sign({ name: req.body.name }, jwtSecret)
      .then(token => res.send({ token }));
  }
}

module.exports = AuthorsController;
