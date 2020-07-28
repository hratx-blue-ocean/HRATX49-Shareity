const router = require('express').Router();
const db = require('../database');

router.get('/', async (req, res) => {
  // make db queries and res.json the data
  //push to reset github branch
  let result = await db.getData()
  res.json(result);
});

module.exports = router;