const express = require('express');

const router = express.Router();

const { posts, authors, sobre } = require('./routes');

router.use('/', posts);
router.use('/author', authors);
router.use('/sobre', sobre);

module.exports = router;
