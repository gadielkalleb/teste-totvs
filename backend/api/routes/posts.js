const router = require('./router');
const postsController = require('../posts');
const authController = require('../../tools/auth');

router.use('/', authController);

router.get('/', postsController.getAll);
router.get('/:id', postsController.info);
router.delete('/:id', postsController.deleteOne);
router.put('/:id', postsController.editOne);

module.exports = router;
