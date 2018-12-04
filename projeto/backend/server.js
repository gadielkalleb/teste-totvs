const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

// rotas
const api = require('./api')

// process request body
app.use(bodyParser.urlencoded({ extended: true }))

// assets
app.use(express.static('public'))

// view engine - EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', api)


app.listen(port, () => console.log('escutando app na porta ' + port+' acesse o link http://localhost:'+port))
