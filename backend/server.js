const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

const mongodb = require('./db')

const loadData = require('./tools/insertData')
// rotas
const api = require('./api')

// process request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

loadData()

app.use('/', api)
app.listen(port, () => {
  console.log('escutando app na porta ' + port+' acesse o link http://localhost:'+port)
  mongodb.start()
})
