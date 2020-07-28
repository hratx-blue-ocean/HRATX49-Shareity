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
  let userInfo = {
    user: req.query.donor,
    userType: 'donor',
    items: []
  }
  let newItem = {
    donor: req.query.donor,
    name: req.query.name,
    claimedBy: null,
    pickedUp: false,
    Description: req.query.Description,
    pictures: null,
    estimatedValue: req.query.estimatedValue,
    itemCondition: req.query.itemCondition,
    Location: req.query.Location,
    dateCreated: req.query.dateCreated,
    category: req.query.category
  }
  try {
    let item = await db.addItem(newItem);
    userInfo.items = await db.getItems(userInfo.user, userInfo.userType);
  }
  catch (err) {
    console.log(err);
  }
  res.json(userInfo);
});

router.put('/', async (req, res) => {
  let userInfo = {
    user: req.query.user,
    userType: req.query.userType,
    items: [],
  }
  let filter = req.query._id;
  let update = req.query.item
  try {
    let updateItem = await db.editItem(filter, update);
    userInfo.items = await db.getItems(userInfo.user, userInfo.userType);
  }
  catch (err) {
    console.log(err);
  }
  res.json(userInfo);
})

module.exports = router;
