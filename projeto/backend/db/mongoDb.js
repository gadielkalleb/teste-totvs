const mongoose = require('mongoose');
const { db } = require('../config')

mongoose.set('useCreateIndex', true)


console.time('tempo de execução do mongoose')
mongoose.connect(db.url)
console.timeEnd('tempo de execução do mongoose')
mongoose.Promise = require('bluebird')

module.exports = mongoose
