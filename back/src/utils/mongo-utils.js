const MongoClient = require('mongodb').MongoClient;

async function connect() {
  let client, db;
  try {
    client = await MongoClient.connect(process.env.MONGO_URL, { useUnifiedTopology: true });
    db = client.db('pepechill');
  } catch (err) {
    return;
  }
  return { db, client };
}

/**
 *
 * @param {String} collection
 * @param {Object} query
 */
async function find(collection, query) {
  const { db, client } = await connect();

  const cl = db.collection(collection);
  const data = await cl.find(query).toArray();

  client.close();

  return data;
}

async function insertOne(collection, data) {
  const { db, client } = await connect();

  const cl = db.collection(collection);
  console.log(data);
  await cl.insertOne(data);

  client.close();
}

async function findOne(collection, query) {
  const { db, client } = await connect();

  const cl = db.collection(collection);
  const data = await cl.findOne(query);

  client.close();

  return data;
}

async function updateOne(collection, query, updateData) {
  const { db, client } = await connect();

  const cl = db.collection(collection);
  const data = await cl.updateOne(query, { $set: updateData });

  client.close();

  return data;
}

module.exports = {
  connect,
  find,
  findOne,
  insertOne,
  updateOne,
};
