require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    url: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/meus-posts',
    options: {
      useNewUrlParser: true,
    },
  },
  dbTest: {
    url: process.env.MONGODB_URL_TEST || 'mongodb://127.0.0.1:27017/tests-meus-posts',
    options: {
      useNewUrlParser: true,
    },
  },
  session: {
    secret: 'socketio',
    cookie: {
      maxAge: 10 * 60 * 1000,
    },
    proxy: true,
    resave: true,
    saveUninitialized: true,
  },
  jwtSecret: '😄😃😀😊☺😉😍😘😚😗😙😜😝😛😳😁😔😌😒😞😣😢😂😪😥😰😅',
};
