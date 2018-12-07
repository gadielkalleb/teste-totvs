const express = require('express');

const authorsController = require('../authors');

const router = express.Router();

router.post('/auth', authorsController.authAuthors);
router.get('/:id', authorsController.getOne);
router.put('/:id', authorsController.editOne);
router.delete('/:id', authorsController.deleteOne);

module.exports = router;
