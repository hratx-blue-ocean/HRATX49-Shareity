const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const CONFIG = require('./config')
const { ObjectID } = require('mongodb');
const url = CONFIG.url;
const dbName = CONFIG.dbName;
const itemCollName = CONFIG.itemCollName;
const userCollName = CONFIG.userCollName;

const client = new MongoClient(url, { useUnifiedTopology: true });



client.connect((err) => {
  assert.equal(null, err);
  console.log('Successfully connected to mongoDB');

  const db = client.db(dbName);
  const userCollection = db.collection(userCollName);
  const itemCollection = db.collection(itemCollName);

  //queries go here

  client.getData = async () => {
    try {
      let result = await itemCollection.find().toArray();
      console.log(result);
      return result;
    } catch(err) {
      throw new Error(err);
    }
  }
});

module.exports = client;