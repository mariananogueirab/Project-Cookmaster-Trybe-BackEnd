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

const update = async (id, name, ingredients, preparation) => {
  const db = await connect();
  await db.collection(DB_COLLECTION)
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
    const recipe = await getRecipeById(id);
    return recipe;
};

const deleteRecipe = async (id) => {
  const db = await connect();
  const recipe = await getRecipeById(id);
  await db.collection(DB_COLLECTION)
    .remove({ _id: ObjectId(id) }, {});
  return recipe;
};

const urlImageCreate = async (id, image) => {
  const db = await connect();
  await db.collection(DB_COLLECTION)
    .updateOne({ _id: ObjectId(id) }, { $set: { image } });
    const recipe = await getRecipeById(id);
    console.log('model image: ', image);
    return recipe;
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
  update,
  deleteRecipe,
  urlImageCreate,
};