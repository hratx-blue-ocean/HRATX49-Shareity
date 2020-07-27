const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../database');

router.get('/', (req, res) => {
  // make db queries and res.json the data
  res.json({data:['dolphins', 'manatees', 'sea turles']})
})
const saltRounds = 12;

router.post('/login', async (req, res) => {
  // make db queryies and res.json the data
  let userInfo = {
    user: null,
    items: []
  }
  try {
    //need to check login information against what is in the database
    //get user from db where email = req.body.email
    let user = await db.getUser(req.body.email);
    if(user !== null) {
      //If the email wasn't in the database, then the user doesn't exist
      //If it does, check the password hash against bcrypt
      let match = await bcrypt.compare(req.body.password, user.password);
      delete user.password;
      userInfo.user = match ? user : null;
    }
    if(userInfo.user !== null) {
      //If the password was correct, log in (get items)
      userInfo.items = await db.getItems(userInfo.user.name);
    }
  } catch (err) {
    console.log(err);
  }
  //return the correct information
  res.json(userInfo)
});

router.post('/signup', async (req, res) => {
  // make db queryies and res.json the data
  let userInfo = {
    user: null,
    items: []
  }
  //user does not exist yet
  try {
    //hash the provided password password
    let hash = await bcrypt.hash(req.body.password, saltRounds);
    //insert the user data into the user collection
    let user = await db.createUser(req.body, hash);
    userInfo.user = user.ops[0];
    delete userInfo.user.password;
  } catch (err) {
    console.log(err);
  }
  //return the user data with items: null
  res.json(userInfo);
});

module.exports = router;