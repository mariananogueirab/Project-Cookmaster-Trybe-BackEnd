const express = require('express');
const path = require('path');
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

app.use('images', express.static(path.join(__dirname, '..', '/uploads'))); // sempre que receber uma request, o express vai primeiro verificar se o caminho da request é o nome de um arquivo que existe em `uploads`. Se for, o express envia o conteúdo desse arquivo e encerra a response.

app.use('/users', users);
app.post('/login', login);
app.use('/recipes', recipes);
app.use(errorMiddleware);

module.exports = app;
