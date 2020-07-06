
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const DatabaseConnection = require('./db-connection');
const RecordController = require('./recordController');
const port = 3000;

// initialize database connection
DatabaseConnection();

// init express
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.post('/api', RecordController.getRecords);

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(port, function cb(params) {
    console.log(`Server is listening on port ${port}...`)
});

module.exports = server;