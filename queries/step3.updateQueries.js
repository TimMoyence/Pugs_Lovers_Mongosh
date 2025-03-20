async function runUpdates(db) {
  const pugsCollection = db.collection('pugs');

  // 1. Modifier une valeur spécifique dans le premier document retourné par un filtre
  // Exemple : modifier le champ "description" du premier document où "weight" > 8.
  const filter = { weight: { $gt: 8 } };
  const updateSet = {
    $set: {
      description:
        "Je ne ronfle pas, je fais des bruitages de film d'action... en Dolby Surround +8 kg ! 🐶🎬",
    },
  };
  const updateOneResult = await pugsCollection.updateOne(filter, updateSet);
  console.log(
    "Résultat updateOne : modification d'une du commentaire pour les carlins de + de 8kg :",
    updateOneResult,
  );

  // 2. Incrémenter une valeur spécifique dans tous les documents d’un montant X.
  // Exemple : augmenter la valeur "ageInYears" de 1 pour tous les documents.
  // Remarque : Assurez-vous que le champ "ageInYears" existe dans vos documents (ou ajustez l'exemple).
  const updateIncrement = { $inc: { ageInYears: 1 } };
  const updateManyResult = await pugsCollection.updateMany({}, updateIncrement);
  console.log(
    "Résultat updateMany (incrémentation d'une année :",
    updateManyResult,
  );

  // 3. Ajouter un élément à un tableau d’objets imbriqués.
  // Exemple : ajouter une nouvelle vaccination dans le tableau "vaccinations".
  const updatePush = {
    $push: {
      vaccinations: {
        vaccineName: 'Hépatite',
        date: '2023-02-20',
      },
    },
  };
  const updatePushResult = await pugsCollection.updateMany({}, updatePush);
  console.log(
    "Résultat updateMany ajout au tableau des vaccins l'Hépatite :",
    updatePushResult,
  );

  // 4. Renommer un champ dans tous les documents.
  // Exemple : renommer le champ "description" en "comments".
  const updateRename = { $rename: { description: 'comments' } };
  const updateRenameResult = await pugsCollection.updateMany({}, updateRename);
  console.log(
    'Résultat updateMany rennomage de la description en commentaire :',
    updateRenameResult,
  );

  // 5. Supprimer toutes les valeurs d’une collection.
  // ATTENTION : Cette commande supprimera TOUS les documents de la collection.
  // Pour éviter l'exécution réelle de cette opération, la commande est commentée.
  /*
  const deleteResult = await pugsCollection.deleteMany({});
  console.log("Résultat deleteMany (suppression de tous les documents) :", deleteResult);
  */
  console.log(
    "La commande de suppression a été commentée pour éviter l'exécution.",
  );
}

module.exports = { runUpdates };
