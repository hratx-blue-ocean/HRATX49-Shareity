const router = require('express').Router();
const db = require('../database');

router.get('/', async (req, res) => {
  // make db queries and res.json the data
  //push to reset github branch
  let result = await db.getData()
  res.json(result);
});

// add new item
router.post('/', async (req, res) => {
  try {
    await db.postItem(req.body)
  }

});

module.exports = router;