const connect = require('./connection');

const DB_COLLECTION = 'users';

const create = async (name, email, password) => {
  const db = await connect();
  const { insertedId } = await db.collection(DB_COLLECTION)
    .insertOne({ name, email, password, role: 'user' });
  return insertedId;
};

const findUserByEmail = async (email) => {
  const db = await connect();
  const emailExists = await db.collection(DB_COLLECTION).findOne({ email });
  return emailExists;
};

module.exports = {
  create,
  findUserByEmail,
};