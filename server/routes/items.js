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
  console.log(req.body);
  let userInfo = {
    user: req.body.donor,
    userType: 'donor',
    items: []
  }
  let newItem = {
    donor: req.body.donor,
    name: req.body.name,
    email: req.body.email,
    claimedBy: null,
    pickedUp: false,
    Description: req.body.Description,
    pictures: req.body.pictures || null,
    estimatedValue: req.body.estimatedValue,
    itemCondition: req.body.itemCondition,
    Location: req.body.Location,
    dateCreated: req.body.dateCreated,
    category: req.body.category
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
    user: req.body.user,
    userType: req.body.userType,
    items: [],
  }
  let filter = req.body._id;
  let update = req.body.item
  try {
    let updateItem = await db.editItem(filter, update);
    userInfo.items = await db.getItems(userInfo.user, userInfo.userType);
  }
  catch (err) {
    console.log(err);
  }
  res.json(userInfo);
});

router.delete('/', async (req, res) => {
  let userInfo = {
    user: req.body.user,
    userType: 'donor',
    items: [],
  }
  try {
    await db.deleteItem(req.body._id)
    userInfo.items = await db.getItems(userInfo.user, userInfo.userType);
  }
  catch (err) {
    console.log(err);
  }
  res.json(userInfo);
})

module.exports = router;
