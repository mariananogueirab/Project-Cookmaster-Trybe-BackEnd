const express = require('express');
const errorMiddleware = require('../middlewares/errorMiddleware');
const { userCreate } = require('../controllers/users.controller');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userCreate);
app.use(errorMiddleware);

module.exports = app;
