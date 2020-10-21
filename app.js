'use strict';

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const app = express();
const db = mongoose.connection;


require('./routes')(app);

const mongoUrl = ``;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect(
    mongoUrl,{useNewUrlParser: true}
);



const server = http.createServer(app);
const port = 2500;
server.listen(port, () => {
    console.log(`sDesign NODE SERVER - RUNNING ON ${port}`);
})