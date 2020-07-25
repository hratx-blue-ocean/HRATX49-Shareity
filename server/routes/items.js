const router = require('express').Router();
const db = require('../database');

router.get('/', async (req, res) => {
  // make db queryies and res.json the data
  let result = await db.getData()
  res.json(result);
});

module.exports = router;