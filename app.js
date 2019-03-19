const express = require("express");
const Timer = require("./timer");
const fs = require("fs");
const https = require("https")
const FILEPATH = __dirname + '/stocks.json';

var app = express();

app.get("/", (req,res) => res.sendStatus(404))


app.get("/stocks", (req, res, next) => {
    var contents = fs.readFileSync(FILEPATH,'utf8');
    res.json(contents);
})


app.all("/*", (req, res) => res.sendStatus(404))

app.listen(7010, () => {
    console.log("Server running on port 7010");
})

// const server = https.createServer(app).listen(, () => {
//    console.log("server: "+ server.address().port)
//   })

Timer();