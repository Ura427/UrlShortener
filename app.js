//imports
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const mongoose = require("mongoose");

//modules
const mongooseDb = require("./mongooseDb"); 
const cryptography = require("./cryptography");


//app uses
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

//global variables
var currShortLink = "";
var currOriginalLink = "";


//Home GET
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html"); 
})

//Home POST
app.post("/", function(req, res){
    const inputText = req.body.link;//Get input text value
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; //Get full page url

    hashedText = fullUrl + cryptography.HashString(inputText);

    //Set current links
    currOriginalLink = inputText;
    currShortLink = hashedText


    mongooseDb.AddToDb(currOriginalLink, currShortLink);

    res.redirect("/short");
})

//Short GET
app.get("/short", async function(req,res){
    var linkObject = await mongooseDb.Find(currShortLink);

    res.render("short", {shortLink: linkObject.shortenedLink, originalLink: linkObject.originalLink});
})


//Link GET
app.get("/:link", async function(req, res){
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; //Get full page url


     var linkObject = await mongooseDb.Find(fullUrl);

      res.writeHead(301, {
        Location: linkObject.originalLink
      }).end();
})


//Connect to port
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});