const express = require('express');

const router = express.Router();

const { posts, sobre } = require('./routes');

router.use('/', posts);
router.use('/sobre', sobre);


module.exports = router;
