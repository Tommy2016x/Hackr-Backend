const express = require('express');
const bodyparser = require('body-parser');

const db = require('./database');

db();

const users = require('./routes/api/users')
const locationService = require('./routes/api/geolocation');

const app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use('/users',users);
app.use('/location',locationService);



app.listen(3000);

console.log('listening on port 3000');