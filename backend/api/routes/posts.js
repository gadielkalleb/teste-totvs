const express = require('express');
const postsController = require('../posts');


const router = express.Router();

router.get('/', postsController.getAll);
router.get('/:id', postsController.info);
router.delete('/:id', postsController.deleteOne);
router.put('/:id', postsController.editOne);

module.exports = router;
