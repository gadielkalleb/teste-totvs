const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../../config');

module.exports = Model => ({
  authAuthors: (req, res) => {
    jwt.sign({ name: req.body.name }, jwtSecret).then(token => res.send({ token }));
  },
});
