const express = require('express');
const usersController = require('../posts');

const router = express.Router();

router.get('/:id', usersController.getOne);
router.put('/:id', usersController.editOne);
router.delete('/:id', usersController.deleteOne);

module.exports = router;
