const router = require('express').Router();
const db = require('../database');


router.get('/', async (req, res) => {
  // make db queries and res.json the data
  //push to reset github branch
  let result = null;
  try {
    result = await db.getAchievements(req.body.email);
  } catch (err) {
    console.log(err);
  }

  res.json(result);
});

router.post('/newAchievement', async (req, res) => {
    //user does not exist yet
    let result = null;
    try {
      let achievements = await db.createAchivement(req.body);
      result = await db.getAchievements(req.body.email);
    } catch (err) {
      console.log(err);
    }

    res.json(result);
});

module.exports = router;
