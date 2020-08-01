const createError = require('http-errors');
const express = require('express');
const path = require('path');
const db = require('./database.js');
const profile = require( './routes/api/profile' );
const app = express();
const PORT = process.env.PORT || 5000;

//image upload
app.use( '/api/profile', profile );

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
const { users, items, achievements } = require('./routes');
app.use('/users', users);
app.use('/items', items);
app.use('/achievements', achievements);
app.use('/api/profile', profile)
//User/Charity Routes
app.get('/Charity', async (req, res) => {
    res.redirect('/');
});
app.get('/aboutUs', async (req, res) => {
    res.redirect('/');
});

// Item Routes

app.listen(PORT, () => {
    console.log(`Express is connected on port ${PORT}`);
})