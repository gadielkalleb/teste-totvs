const router = require('./router');
const authorsController = require('../authors');

router.post('/auth', authorsController.authAuthors);

module.exports = router;
