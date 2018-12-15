const AuthorsController = require('./controller/AuthorsController');
const authors = require('./models/authors');

module.exports = AuthorsController(authors);
