const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../database');

const saltRounds = 12;

router.post('/login', async (req, res) => {
  // make db queryies and res.json the data
  let userInfo = {
    user: null,
    items: null
  }
  //need to check login information against what is in the database
    //get user from db where email = req.email
  //If the email wasn't in the database, then the user doesn't exist
  //Else, check the password hash against bcrypt
    //If the password was correct, log in
    //else the do not log the user in.

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