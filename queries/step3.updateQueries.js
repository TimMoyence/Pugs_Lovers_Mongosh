async function runUpdates(db) {
  const pugsCollection = db.collection("pugs");

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
    updateOneResult
  );

  const updateIncrement = { $inc: { ageInYears: 1 } };
  const updateManyResult = await pugsCollection.updateMany({}, updateIncrement);
  console.log(
    "Résultat updateMany (incrémentation d'une année :",
    updateManyResult
  );

  const updatePush = {
    $push: {
      vaccinations: {
        vaccineName: "Hépatite",
        date: "2023-02-20",
      },
    },
  };
  const updatePushResult = await pugsCollection.updateMany({}, updatePush);
  console.log(
    "Résultat updateMany ajout au tableau des vaccins l'Hépatite :",
    updatePushResult
  );

  const updateRename = { $rename: { description: "comments" } };
  const updateRenameResult = await pugsCollection.updateMany({}, updateRename);
  console.log(
    "Résultat updateMany rennomage de la description en commentaire :",
    updateRenameResult
  );

  // ! Pour éviter l'exécution réelle de cette opération, la commande est commentée.
  /*
  const deleteResult = await pugsCollection.deleteMany({});
  console.log("Résultat deleteMany (suppression de tous les documents) :", deleteResult);
  */
  console.log(
    "La commande de suppression a été commentée pour éviter l'exécution."
  );
}

module.exports = { runUpdates };
