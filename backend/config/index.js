require('dotenv').config();

module.exports = {
  db: {
    url: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/meus-posts',
    options: {
      useNewUrlParser: true,
    },
  },
};
