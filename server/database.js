const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const CONFIG = require('./config.js');
const { ObjectID } = require('mongodb').ObjectID;
const url = CONFIG.url;
const dbName = CONFIG.dbName;
const itemCollName = CONFIG.itemCollName;
const userCollName = CONFIG.userCollName;
// const ObjectID = require('mongodb').ObjectID;

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
    try {
      let newItem = await itemCollection.insertOne(item);
      return newItem;
    }
    catch (error) {
      console.log(error);
      return null;
    }
  }

  // edit item
  client.editItem = async (filter, update) => {
    // console.log('edit item filter', filter);
    // console.log('edit item update', update);
    try {
      let updated = await itemCollection.updateOne({_id: ObjectID(filter)}, {$set:update});
      return updated;
    }
    catch (error) {
      console.log(error);
      return null;
    }
  }

});

client.editItem = async (item) => {
  console.log('edit item', item);
  // try {
  //   let updatedItem = await itemCollection.updateOne({_id: {item.id}}, {$set:{}})
  // }
}


module.exports = client;