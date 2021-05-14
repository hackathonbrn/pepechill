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
  await cl.insertOne(data);

  client.close();
}

module.exports = {
  connect,
  find,
  insertOne,
};