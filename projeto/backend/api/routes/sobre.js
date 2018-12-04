const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('sobre')
})

module.exports = router