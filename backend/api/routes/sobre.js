const router = require('../../tools/router');

router.get('/', (req, res) => {
  res.render('sobre');
});

module.exports = router;
