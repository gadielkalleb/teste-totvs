const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const mongodb = require('./db');
const { db } = require('./config');

const loadData = require('./tools/insertData');

const api = require('./api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', api);

app.listen(port, () => {
  console.log(`escutando app na porta ${port} acesse o link http://localhost:${port}`);
  mongodb
    .start(db)
    .then(() => loadData(db))
    .catch(e => console.log(e));
});
