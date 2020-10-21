const fs = require('fs');
const list = fs.readdirSync(__dirname).filter((dir) => !dir.match(/(^\.)|index/i));
const router = require('express').Router();

module.exports = (app) => {
    for(let s of list){
        app.use("/api", require(`./${s}`)(router))
    }
}