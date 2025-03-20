async function updateReferenceAndAggregate(db) {
  const pugsCollection = db.collection('pugs');
  const toysCollection = db.collection('toys');

  const pugs = await pugsCollection.find({}).toArray();

  let availableToys = await toysCollection.find({}).toArray();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(availableToys);

  if (availableToys.length < pugs.length) {
    console.log(
      'Not enough toys available to assign a unique toy to each pug.',
    );
    return;
  }

  for (const pug of pugs) {
    const toy = availableToys.shift();

    await pugsCollection.updateOne(
      { _id: pug._id },
      { $set: { toyRef: toy._id } },
    );
    console.log(`Assigned toy _id ${toy._id} to pug ${pug.name}`);
  }

  const aggregateCursor = pugsCollection.aggregate([
    {
      $lookup: {
        from: 'toys',
        localField: 'toyRef',
        foreignField: '_id',
        as: 'toyInfo',
      },
    },
  ]);

  const results = await aggregateCursor.toArray();
  console.log('Aggregation results (pugs with their assigned toys):');
  console.log(results);
}

module.exports = { updateReferenceAndAggregate };
