require('dotenv').config();
const { connectToDatabase, client } = require('./connect.mongodb');

async function createToysCollection() {
  try {
    const clientInstance = await connectToDatabase();
    console.log("Connecté à MongoDB Atlas pour créer la collection 'toys'.");

    const db = clientInstance.db('Pugs_Lovers');
    const toysCollection = db.collection('toys');

    const toyNames = [
      'Os',
      'Paf',
      'Boum',
      'Balle',
      'Joujou',
      'Frisbee',
      'Peluchon',
      'Dingounet',
      'Rigolorama',
      'Rigolissime',
      'Rigolophonie',
      'Farfelucherie',
      'Rigolastiqueur',
      'Fantasmagorique',
      'Abracadabriqueur',
      'Rigolopédagogique',
      'Extraordinairement',
      'Incommensurablement',
      'Supercalifragilistiq',
    ];

    const toysDocs = toyNames.map((name) => ({
      _id: name.length,
      toyName: name,
      madeIn: 'France',
      recommendedAge: Math.floor(Math.random() * 3) + 1,
    }));

    const result = await toysCollection.insertMany(toysDocs);
    console.log(
      "Collection 'toys' créée avec succès. Documents insérés :",
      result.insertedIds,
    );
  } catch (err) {
    console.error("Erreur lors de la création de la collection 'toys' :", err);
  } finally {
    await client.close();
    console.log('Connexion fermée.');
  }
}

createToysCollection();
