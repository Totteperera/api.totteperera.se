const express = require("express");
const Timer = require("./timer");
const fs = require("fs");
const FILEPATH = __dirname + '/stocks.json';

var app = express();

app.all("/*", (req, res) => res.sendStatus(404))
app.get("/", (req,res) => res.sendStatus(404))


app.get("/url", (req, res, next) => {
    var contents = fs.readFileSync(FILEPATH,'utf8');
    res.json(contents);
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})

Timer();