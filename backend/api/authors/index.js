const AuthorsController = require('./controller/AuthorsController');
const authors = require('./model/authors');

module.exports = new AuthorsController(authors);
