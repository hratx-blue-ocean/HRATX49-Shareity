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

  //user queries
  client.createUser = async (userInfo, hash) => {
    try {
      let insertData = {
        ...userInfo,
        password: hash
      };
      let insertResults = await userCollection.insertOne(insertData);
      return insertResults;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  client.getUser = async (email) => {
    try {
      let user = await userCollection.findOne({ email });
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  //item queries

  client.getItems = async (userName, userType) => {
    try {
      //set up query based on donor vs charity
      let query = {};
      if (userType === "donor") {
        query.donor = userName;
      } else {
        query.claimedBy = userName;
      }
      //find items associated with user or charity
      let result = await itemCollection.find( query ).toArray();
      return result;
    } catch(err) {
      console.log(err);
      return [];
    }
  }

  client.getData = async () => {
    try {
      let result = await itemCollection.find().toArray();
      return result;
    } catch(err) {
      throw new Error(err);
    }
  }

  // add item
  client.addItem = async (item) => {
    console.log('add item', item);
    try {
      let newItem = await itemCollection.insertOne(item);
      return newItem;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
});


module.exports = client;