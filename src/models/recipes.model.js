const connect = require('./connection');

const DB_COLLECTION = 'recipes';

const create = async (name, ingredients, preparation) => {
  const db = await connect();
  const { insertedId } = await db.collection(DB_COLLECTION)
    .insertOne({
      Nome: name,
      Ingredientes: ingredients,
      'Modo de preparo': preparation,
      'URL da imagem': '',
      'Id do Autor': '', // id do usuário logado, pegar do token
    });
  return insertedId;
};

module.exports = {
  create,
};