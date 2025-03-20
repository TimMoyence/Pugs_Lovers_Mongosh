require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/**
 * Fonction asynchrone pour se connecter à la base de données.
 * Retourne le client connecté.
 */
async function connectToDatabase() {
  await client.connect();
  console.log('Connected to MongoDB Atlas successfully!');
  return client;
}

module.exports = { connectToDatabase, client };
