const express = require('express');
const users = require('../routes/users');
const errorMiddleware = require('../middlewares/errorMiddleware');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', users);
app.use(errorMiddleware);

module.exports = app;
