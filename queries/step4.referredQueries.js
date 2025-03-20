require('dotenv').config();
const { MongoClient } = require('mongodb');

async function updateReferenceAndAggregate(db) {
  try {
    const pugsCollection = db.collection('pugs');

    // 1. Mise à jour : Ajouter le champ "toyRef" dans chaque document,
    // calculé comme le nombre de lettres du champ "name"
    const updateResult = await pugsCollection.updateMany({}, [
      {
        $set: {
          toyRef: { $strLenCP: '$name' },
        },
      },
    ]);
    console.log(
      `Mise à jour réalisée : ${updateResult.modifiedCount} documents mis à jour.`,
    );

    // 2. Agrégation : $lookup pour joindre les documents de pugs avec ceux de toys
    // en reliant le champ "toyRef" de pugs avec le champ "_id" de toys.
    const aggregateCursor = pugsCollection.aggregate([
      {
        $lookup: {
          from: 'toys', // La collection à joindre
          localField: 'toyRef', // Champ dans pugs
          foreignField: '_id', // Champ dans toys
          as: 'toyInfo', // Nom du tableau résultat dans chaque document
        },
      },
    ]);

    const results = await aggregateCursor.toArray();
    console.log(
      "Résultats de l'agrégation (pugs avec leurs toys référencés) :",
    );
    console.log(results);
  } catch (error) {
    console.error("Erreur lors de la mise à jour et de l'agrégation :", error);
  } finally {
    await client.close();
    console.log('Connexion fermée.');
  }
}

updateReferenceAndAggregate();
