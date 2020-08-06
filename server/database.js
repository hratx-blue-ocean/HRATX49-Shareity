const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const CONFIG = require('./config.js');
const { ObjectID } = require('mongodb').ObjectID;
const url = CONFIG.url;
const dbName = CONFIG.dbName;
const itemCollName = CONFIG.itemCollName;
const userCollName = CONFIG.userCollName;
const achievementCollName = CONFIG.achievementCollName;

const client = new MongoClient(url, { useUnifiedTopology: true });



client.connect((err) => {
  assert.equal(null, err);
  console.log('Successfully connected to mongoDB');

  const db = client.db(dbName);
  const userCollection = db.collection(userCollName);
  const itemCollection = db.collection(itemCollName);
  const achievementCollection = db.collection(achievementCollName);

  //queries go here

  //user queries
  client.createUser = async (userInfo, hash) => {
    try {
      let insertData = {
        ...userInfo,
        password: hash,
        profilePic: "https://blueoceancmurray.s3.us-east-2.amazonaws.com/Screen%20Shot%202020-07-25%20at%2011.02.07%20AM-1596071065433.jpg"
      };
      let insertResults = await userCollection.insertOne(insertData);
      return insertResults;
    } catch (err) {
      console.log(err);
      //throw error
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

  client.updateProfilePic = async (email, profilePic) => {
    try {
       let query = await userCollection.updateOne({email: email}, {$set: profilePic });
       return query;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  client.updatePassword = async (email, hash) => {
    try {
      let user = await userCollection.updateOne({email: email}, {$set: {password: hash}});
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  //item queries
  client.getData = async () => {
    try {
      let result = await itemCollection.find().toArray();
      return result;
    } catch(err) {
      throw new Error(err);
    }
  }

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


  client.getUserItems = async (userEmail, userType) => {
    try {
      //set up query based on donor vs charity
      let query = {};

      if (userType === 'donor') {
        query.email = userEmail;
      } else {
        query.charityEmail = userEmail;
      }

      //find items associated with user or charity
      let result = await itemCollection.find( query ).toArray();
      return result;
    } catch(err) {
      console.log(err);
      return [];
    }
  }


  // add item
  client.addItem = async (item) => {
    try {
      // console.log('item', item);
      let newItem = await itemCollection.insertOne(item);
      return newItem;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // edit item
  client.editItem = async (filter, update) => {
    try {
      let updated = await itemCollection.updateOne({_id: ObjectID(filter)}, {$set:update});
      return updated;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  client.deleteItem = async (id) => {
    try {
      let deleted = await itemCollection.deleteOne({_id: ObjectID(id)});
      return deleted;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // achievement queries go here
  client.getAchievements = async (email) => {
    try {
      //set up query
      let query = {
        email
      };
      //find items associated with user or charity
      let result = await achievementCollection.find( query ).toArray();
      return result;
    } catch(err) {
      console.log(err);
      return [];
    }
  }

  client.createAchivement = async ({email, achievement}) => {
    try {
      let insertData = {
        email,
        ...achievement
      };

      let insertResults = await userCollection.insertOne(insertData);
      return insertResults;
    } catch (err) {
      console.log(err);
      //throw error
      return null;
    }

  }

});


module.exports = client;