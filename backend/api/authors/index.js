const AuthorsController = require('./controller/AuthorsController');
const authors = require('./model/authors');

module.exports = AuthorsController(authors);
