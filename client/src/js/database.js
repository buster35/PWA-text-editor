import { openDB } from 'idb';

// We will define a global constant for our database name so we don't mess it up anywhere
const DB_NAME = "jate"

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


//take updated content and save it to IndexedDB.
export const putDb = async (content) => {
  
  //asyncronously await the opening of the database
  const databaseInit = await openDB(DB_NAME, 1);

  const transactionInit = databaseInit.transaction(DB_NAME, 'readwrite');

  const storeInit = transactionInit.objectStore(DB_NAME);

  const request = storeInit.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};


//get all content from IndexedDB.
export const getDb = async () => {
 
  const databaseInit = await openDB(DB_NAME, 1);

  const transactionInit = databaseInit.transaction(DB_NAME, 'readonly');

  const storeInit = transactionInit.objectStore(DB_NAME);

  const request = storeInit.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
