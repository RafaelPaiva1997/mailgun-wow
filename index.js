// Libraries
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require ('cookie-parser');

// Modules
const libs = require('./functionals/libs');
const files = libs.files(__dirname + '/controllers');
const handlers = libs.handlers(files, "../controllers/");
const database = require('./functionals/database');

// Config
const CONFIG = require('./config.json');
const db_url = "mongodb://" + CONFIG.db.username + ':' + CONFIG.db.password + '@' + CONFIG.db.address + ':' + CONFIG.db.port + '/' + CONFIG.db.dbname;

// App
var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.post("/scales", function (req, res) {
    //console.log(req.body);
    try {
        handlers[req.body.lib][req.body.action](req,res);
    } catch (Exception) {
        console.log("BAD REQUEST: ", req.body);
        console.log(Exception);
        res.sendStatus(400);
    }
});

app.listen(CONFIG.port, CONFIG.address, function () {
    database.connect(db_url, files)
    console.log("Listening on " + CONFIG.address + ", port " + CONFIG.port)
});