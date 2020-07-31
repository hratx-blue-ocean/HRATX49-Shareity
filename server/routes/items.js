const router = require('express').Router();
const db = require('../database');


router.get('/', async (req, res) => {
  // make db queries and res.json the data
  //push to reset github branch
  let result = await db.getData()
  res.json(result);
});

// get user's items
router.get('/items', async (req, res) => {
  let userInfo = {
    userEmail: req.query.email,
    userType: req.query.userType,
    items: []
  }
  userInfo.items = await db.getUserItems(req.query.email, req.query.userType)
  res.json(userInfo);
});

// add new item
router.post('/', async (req, res) => {
  // console.log(req.body);
  let userInfo = {
    user: req.body.donor,
    userEmail: req.body.email,
    userType: 'donor',
    items: []
  }
  let newItem = {
    donor: req.body.donor,
    name: req.body.name,
    claimedBy: null,
    pickedUp: false,
    Description: req.body.Description,
    pictures: req.body.pictures,
    estimatedValue: req.body.estimatedValue,
    itemCondition: req.body.itemCondition,
    Location: req.body.Location,
    dateCreated: req.body.dateCreated,
    category: req.body.category,
    email: req.body.email,
    charityEmail: null
  }
  try {
    let item = await db.addItem(newItem);
    userInfo.items = await db.getUserItems(userInfo.userEmail, userInfo.userType);
  } catch (err) {
    console.log(err);
  }
  res.json(userInfo);
});

//update an item
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
    userInfo.items = await db.getUserItems(userInfo.user, userInfo.userType);
    console.log(req.body)
  } catch (err) {
    console.log(err);
  }
  res.json(userInfo);
});

//delete an item
router.delete('/', async (req, res) => {

  try {
    await db.deleteItem(req.query._id)
  } catch (err) {
    console.log(err);
  }
  res.json();
})

module.exports = router;
