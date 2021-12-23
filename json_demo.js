import { createClient } from 'redis';

const client = createClient();
await client.connect();

async function insertJSON() {
  await Promise.all([
    client.json.set('animals:1', '$', {
      name: 'Alfie',
      species: 'dog',
      age: 3,
      weight: 11,
      sex: 'm',
      fee: 20,
      observations: {
        goodWithChildren: true,
        goodWithOtherAnimals: [ 'dog', 'cat' ]
      }
    }),
    client.json.set('animals:2', '$', {
      name: 'Stella',
      species: 'cat',
      age: 5,
      weight: 5.5,
      sex: 'f',
      fee: 10,
      observations: {
        goodWithChildren: false,
        goodWithOtherAnimals: [ 'cat' ]
      }
    }),
  ]);

  console.log('Inserted animal JSON data.');
}

async function retrieveJSON() {
  let data = await client.json.get('animals:1', {
    path: [
      '$',
      '$.observations.goodWithChildren',
      '$.observations.goodWithOtherAnimals[0]'
    ]
  });

  console.log('Retrieved:');
  console.log(JSON.stringify(data, null, 2));

  console.log('Is Alfie good with cats?');
  const goodWithCats = await client.json.arrIndex('animals:1', '$.observations.goodWithOtherAnimals', 'cat');
  console.log(goodWithCats[0] === -1 ? 'No :(' : 'Yes!');
}

async function updateJSON() {
  console.log('Adding 1 to Alfie\'s age...');
  const newAge = await client.json.numIncrBy('animals:1', '$.age', 1);
  console.log(`Alfie is now ${newAge} years old.`);

  console.log('Updating Stella - now friendly with dogs!');
  const arrLen = await client.json.arrAppend('animals:2', '$.observations.goodWithOtherAnimals', 'dog');
  console.log(`Stella is friendly with ${arrLen} types of animal.`);
}

async function disconnect() {
  await client.quit();
}

await insertJSON();
await retrieveJSON();
await updateJSON();
await disconnect();