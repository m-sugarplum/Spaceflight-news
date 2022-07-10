const express = require("express");
const path = require("path");
const port = 8080;

const app = express();

app.use(express.static(__dirname + '/'));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
});

app.get("/library", (req, res) => {
    res.sendFile(path.join(__dirname, "/library.html"))
});

app.listen(port);
console.log("App is listening on port ", port);