import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//export a function we will use to PUT
export const putDb = async (content) =>{
  console.log('putDb implemented');
  // create a connection to that database
  const jateDb = await openDB('jate', 1);
  //create a new transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  //open up the desired object store
  const store =tx.objectStore('jate');
//use the .put method
// may need fix here
  const request = store.put({jate: content});
 //get comfirmation of the request
  const result = await request;
  console.log('Data saved', result,value);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log('GET from Database');
    //create a connection  to the database
    const jateDb = await openDB('jate',1);
//create a new transaction  and specify the databvse and data privileges
    const tx = jateDb.transaction('jate', 'readonly');
    //open up the desired object store
    const store = tx.objectStore('jate');
    // use the .getall() method to get all data in the database
    const request = store.getAll();
    //get confirmation of request
    const result = await request;
    console.log('Data retrieved',result);
  };




initdb();
