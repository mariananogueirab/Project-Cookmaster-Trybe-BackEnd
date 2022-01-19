const { ObjectId } = require('mongodb');
const connect = require('./connection');

const DB_COLLECTION = 'recipes';

const create = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const { insertedId } = await db.collection(DB_COLLECTION)
    .insertOne({
      name,
      ingredients,
      preparation,
      userId, // id do usuário logado, pegar do token
    });
  return insertedId;
};

const getAllRecipes = async () => {
  const db = await connect();
  const recipes = await db.collection(DB_COLLECTION).find().toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  const db = await connect();
  const recipe = await db.collection(DB_COLLECTION)
    .findOne({ _id: ObjectId(id) });
  return recipe;
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
};