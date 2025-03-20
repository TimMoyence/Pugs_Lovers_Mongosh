const { ObjectId } = require('mongodb');

async function runQueries(db) {
  const pugsCollection = db.collection('pugs');

  const anyPug = await pugsCollection.findOne({});
  if (!anyPug) {
    console.log('Aucun document trouvé dans la collection pugs.');
    return;
  }
  const id = anyPug._id;
  const docByObjectId = await pugsCollection.findOne({ _id: id });
  console.log('\n=== Document by _id ===');
  console.log(docByObjectId);

  const docByCustomId = await pugsCollection.findOne({ pugId: 'PUG001' });
  console.log('\n=== Document by custom pugId "PUG001" ===');
  console.log(docByCustomId);

  const sortedDocs = await pugsCollection
    .find({})
    .sort({ dateOfBirth: 1, weight: -1 })
    .toArray();
  console.log('\n=== Documents triés (dateOfBirth ASC, weight DESC) ===');
  console.log(sortedDocs);

  const threeNames = await pugsCollection
    .find({}, { projection: { name: 1, _id: 0 } })
    .limit(3)
    .toArray();
  console.log('\n=== Trois documents avec uniquement le champ "name" ===');
  console.log(threeNames);

  const heavierPugs = await pugsCollection
    .find({ weight: { $gt: 8 } })
    .toArray();
  console.log('\n=== Documents avec weight > 8 ===');
  console.log(heavierPugs);

  const andFilter = await pugsCollection
    .find({
      $and: [{ weight: { $gt: 8 } }, { 'vaccinations.vaccineName': 'Rage' }],
    })
    .toArray();
  console.log('\n=== $and filter: weight > 8 ET vaccination "Rage" ===');
  console.log(andFilter);

  const regexDocs = await pugsCollection
    .find({ name: { $regex: 'lle$', $options: 'i' } })
    .toArray();
  console.log('\n=== Documents dont le nom se termine par "lle" (regex) ===');
  console.log(regexDocs);
}

module.exports = { runQueries };
