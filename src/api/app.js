const express = require('express');
const errorMiddleware = require('../middlewares/errorMiddleware');
const { login } = require('../controllers/login.controller');
const users = require('../routes/users');
const recipes = require('../routes/recipes');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', users);
app.post('/login', login);
app.use('/recipes', recipes);
app.use(errorMiddleware);

module.exports = app;
