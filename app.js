'use strict';

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const app = express();
const db = mongoose.connection;


require('./routes')(app);

const mongoUrl = `mongodb+srv://nodeapi:nC7ZznzhonIg15hd@sDesign.8etgi.mongodb.net/sdesign?retryWrites=true&w=majority`;
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to sDesign mongod Server.');
})
mongoose.connect(
    mongoUrl,mongoOptions
);



const server = http.createServer(app);
const port = 2500;
server.listen(port, () => {
    console.log(`sDesign NODE SERVER - RUNNING ON ${port}`);
})