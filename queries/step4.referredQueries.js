// updateReferenceAndAggregate.js
async function updateReferenceAndAggregate(db) {
  const pugsCollection = db.collection("pugs");
  const toysCollection = db.collection("toys");

  // 1. Récupérer les jouets déjà utilisés par les pugs
  const usedToysDocs = await pugsCollection
    .find({ toyRef: { $exists: true } })
    .project({ toyRef: 1 })
    .toArray();
  const usedToyIds = usedToysDocs.map((doc) => doc.toyRef);
  console.log("Jouets déjà utilisés :", usedToyIds);

  // 2. Trouver les jouets disponibles (ceux dont l'_id n'est pas utilisé)
  const availableToys = await toysCollection
    .find({ _id: { $nin: usedToyIds } })
    .toArray();
  if (availableToys.length === 0) {
    console.log("Aucun jouet disponible pour assignation.");
    return;
  }
  // Sélectionner un jouet aléatoire parmi les jouets disponibles
  const randomIndex = Math.floor(Math.random() * availableToys.length);
  const randomToy = availableToys[randomIndex];
  console.log("Jouet sélectionné aléatoirement :", randomToy);

  // 3. Sélectionner un pug qui n'a pas encore de jouet assigné
  const freePug = await pugsCollection.findOne({ toyRef: { $exists: false } });
  if (!freePug) {
    console.log("Aucun carlin disponible sans jouet.");
    return;
  }
  console.log("Carlin sélectionné pour l'assignation du jouet :", freePug);

  // 4. Mettre à jour le document du pug pour lui assigner le jouet sélectionné
  const updateResult = await pugsCollection.updateOne(
    { _id: freePug._id },
    { $set: { toyRef: randomToy._id } }
  );
  console.log(
    `Carlin mis à jour avec le jouet (modifiedCount: ${updateResult.modifiedCount}).`
  );

  // 5. Agrégation : joindre le pug avec son jouet via $lookup
  const aggregateCursor = pugsCollection.aggregate([
    { $match: { _id: freePug._id } },
    {
      $lookup: {
        from: "toys", // Collection à joindre
        localField: "toyRef", // Champ dans pugs
        foreignField: "_id", // Champ dans toys
        as: "toyInfo", // Nom du tableau résultat
      },
    },
  ]);
  const results = await aggregateCursor.toArray();
  console.log("Résultat de l'agrégation (carlin avec son jouet assigné) :");
  console.log(results);
}

module.exports = { updateReferenceAndAggregate };
