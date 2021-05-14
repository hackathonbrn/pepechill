const MongoClient = require('mongodb').MongoClient;

const mongoClient = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });

/**
 *
 * @param {String} collection
 * @param {String} query
 */
async function find(collection, query) {
  mongoClient.connect(async (err, client) => {
    if (err) {
      console.log(err);
      return;
    }

    const db = client.db('pepechill');
    const cl = db.collection(collection);
    const data = await cl.find(query).toArray();

    return data;
  });
}
