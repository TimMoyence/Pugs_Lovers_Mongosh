const { connectToDatabase, client } = require('../data/connect.mongodb');

async function createIndexes() {
  try {
    const clientInstance = await connectToDatabase();
    const db = clientInstance.db('Pugs_Lovers');

    const pugsCollection = db.collection('pugs');
    const visitsCollection = db.collection('visits');

    await pugsCollection.createIndex({ pugId: 1 }, { unique: true });
    console.log('Index unique créé sur pugs.pugId.');

    await pugsCollection.createIndex({ dateOfBirth: 1, weight: -1 });
    console.log(
      'Index composé créé sur pugs.dateOfBirth (ASC) et pugs.weight (DESC).',
    );

    await pugsCollection.createIndex({ 'owner.lastName': 1 });
    console.log('Index créé sur pugs.owner.lastName.');

    await visitsCollection.createIndex({ pugId: 1 });
    console.log('Index créé sur visits.pugId.');
  } catch (error) {
    console.error('Erreur lors de la création des indexes :', error);
  } finally {
    await client.close();
    console.log('Connexion fermée.');
  }
}

createIndexes();
