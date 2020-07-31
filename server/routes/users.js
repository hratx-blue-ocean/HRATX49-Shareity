const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../database");
const jwt = require("jsonwebtoken");
const jwtKey = "SharityIsASuperSecureWebsite";

const saltRounds = 12;

function authorizationMiddleware(req, res, nextHandler) {
  const accessToken = req.body.token;

  try {
    const tokenPayload = jwt.verify(accessToken, jwtKey);
    response.locals.user = tokenPayload;
    nextHandler();
  } catch (error) {
    response.status(401).send(error.message);
  }
}

router.post("/login", async (req, res) => {
  // make db queryies and res.json the data
  let userInfo = {
    user: null,
    items: [],
  };

  try {
    //need to check login information against what is in the database
    //get user from db where email = req.body.email
    let user = await db.getUser(req.body.email);

    if (user !== null) {
      //If the email wasn't in the database, then the user doesn't exist
      //If it does, check the password hash against bcrypt
      let match = await bcrypt.compare(req.body.password, user.password);
      delete user.password;
      if (match) {
        userInfo.user = user;
        userInfo.token = jwt.sign(
          {
            data: {
              name: user.email,
              type: user.userType,
            },
          },
          jwtKey,
          { expiresIn: "1h" }
        );
      }
    }

    if (userInfo.user !== null) {
      //If the password was correct, log in (get items)
      userInfo.items = await db.getItems(
        userInfo.user.name,
        userInfo.user.userType
      );
    }
  } catch (err) {
    console.log(err);
  }
  //return the correct information
  res.json(userInfo);
});

router.post("/signup", async (req, res) => {
  // make db queryies and res.json the data
  let userInfo = {
    user: null,
    items: []
    //token: jwtToken
  }

  //user does not exist yet
  try {
    //hash the provided password password
    let hash = await bcrypt.hash(req.body.password, saltRounds);
    //insert the user data into the user collection
    let user = await db.createUser(req.body, hash);
    //userINfo.user = user.rows[0]
    if (user !== null) {
      userInfo.user = user.ops[0];
      delete userInfo.user.password;
      userInfo.token = jwt.sign({
        data: {
          name: user.email,
          type: user.userType
        }
      }, jwtKey, { expiresIn: '1h' });
    }
  } catch (err) {
    console.log(err);
  }
  //return the user data with items: null
  res.json(userInfo);
});

router.put("/updateProfilePic", async (req, res) => {
  // db.updateProfilePic(req.body.email, req.body.profilePic)
  let email = req.body.email;
  let profilePic = { profilePic: req.body.profilePic };
  db.updateProfilePic(email, profilePic);

  res.sendStatus(200);
});

router.put("/updatePassword", async (req, res) => {
  let user = false;
  try {
    //hash the provided password password
    let hash = await bcrypt.hash(req.body.password, saltRounds);
    //insert the user data into the user collection
    user = await db.updatePassword(req.body.email, hash);
    user = true;
  } catch (err) {
    console.log(err);
  }
  //return the user data with items: null
  res.json(user);
});

module.exports = router;
