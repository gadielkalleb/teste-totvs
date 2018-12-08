const express = require('express');
const bodyParser = require('body-parser');
const exSession = require('express-session');
const cors = require('cors');

const app = express();

const mongodb = require('./db');
const { db, session, port } = require('./config');

const loadData = require('./tools/insertData');

const expressSession = exSession(session);

const api = require('./api');

app.use(cors());
app.use(expressSession);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);

app.listen(port, () => {
  console.log(`escutando app na porta ${port} acesse o link http://localhost:${port}`);
  mongodb
    .start(db)
    .then(() => console.log('mongodb conectado!!!'))
    .catch(e => console.log(e));
});
