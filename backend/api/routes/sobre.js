const router = require('./router');

router.get('/', (req, res) => {
  res.render('sobre');
});

module.exports = router;
