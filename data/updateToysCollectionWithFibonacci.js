async function updateToysCollection() {
    try {
        const toysCollection = db.collection('toys');
        const toys = await toysCollection.find({}).toArray();

        if (toys.length === 0 || !toys.length) {
            console.log('No toys found in the collection.');
            return;
        }

        const fibonacci = [0, 1];
        for (let i = 2; i < toys.length; i++) {
            fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
        }

        const bulkWriteOperations = toys.map((toy, index) => ({
            updateOne: {
                filter: { _id: toy._id },
                update: { $set: { fibonacci: fibonacci[index] } },
            },
        }));

        if (bulkWriteOperations.length > 0) {
            await toysCollection.bulkWrite(bulkWriteOperations);
            console.log('Toys collection updated with Fibonacci values.');
        }
    } catch (error) {
        console.error('Error updating toys collection:', error);
    }
}

updateToysCollection();