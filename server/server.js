const createError = require('http-errors');
const express = require('express');
const path = require('path');
const db = require('./database.js');
const app = express();
const PORT = process.env.PORT || 5000;

// open up CORS
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.urlencoded( { extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

//Login Routes
const { user, items } = require('./routes');
app.use('/user', user);
app.use('/items', items)

//User/Charity Routes
// app.get('/test', async (req, res) => {
//     let data = await db.getData();
//     res.status(200).send(data);
// });

// Item Routes

app.listen(PORT, () => {
    console.log(`Express is connected on port ${PORT}`);
})