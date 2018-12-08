const express = require('express');

const authorsController = require('../authors');

const router = express.Router();

router.post('/auth', authorsController.authAuthors);

module.exports = router;
