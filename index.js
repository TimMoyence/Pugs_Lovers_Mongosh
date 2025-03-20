const { connectToDatabase, client } = require("./data/connect.mongodb");
const { runQueries } = require("./queries/step2.queries");
const { runUpdates } = require("./queries/step3.updateQueries");
const {
  updateReferenceAndAggregate,
} = require("./queries/step4.referredQueries");

async function main() {
  try {
    const clientInstance = await connectToDatabase();
    const db = clientInstance.db("Pugs_Lovers");

    // RUN les queries de recherches
    await runQueries(db);

    // RUN les UPDATES
    await runUpdates(db);

    const collections = await db.listCollections({ name: "toys" }).toArray();
    if (collections.length > 0) {
      console.log(
        'La collection "toys" existe. Exécution de updateReferenceAndAggregate...'
      );
      await updateReferenceAndAggregate(db);
    } else {
      console.log('La collection "pugs" n\'existe pas.');
    }
  } catch (error) {
    console.error("Erreur lors de l'exécution du script:", error);
  } finally {
    await client.close();
    console.log("\nConnexion fermée. Script terminé.");
  }
}

main().catch(console.dir);
