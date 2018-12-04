require('dotenv').config()
module.exports = {
  db: {
    url: 'mongodb://127.0.0.1:27017/meus-posts',
    options: {
      useNewUrlParser: true,
    }
  }
}