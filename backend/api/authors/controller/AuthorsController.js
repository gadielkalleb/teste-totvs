const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../../config');

module.exports = Model => ({
  authAuthors: async (req, res) => {
    try {
      const author = !await Model.find({ name: req.body.name })
        ? Model.create(req.body)
        : Model.find({ name: req.body.name });
      const token = await jwt.sign({ name: author }, jwtSecret, { expiresIn: 86400 });
      res.status(200).send({ author, token });
    } catch (e) {
      console.log(e);
      res.status(500).send(`Internal server error - ${req.path}`);
    }
  },
});
