const PostSchema = require('./models/posts');
const PostController = require('./controllers/postsController');

module.exports = new PostController(PostSchema);
