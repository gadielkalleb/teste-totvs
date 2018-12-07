const PostSchema = require('./models/posts');
const PostController = require('./controllers/postsController');

module.exports = PostController(PostSchema);
