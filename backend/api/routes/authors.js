const router = require('../../tools/router');
const authorsController = require('../authors');

router.post('/auth', authorsController.authAuthors);

module.exports = router;
