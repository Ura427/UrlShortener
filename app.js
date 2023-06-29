//imports
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const mongoose = require("mongoose");

//modules
const mongooseDb = require("./mongooseDb"); 

//app uses
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

//global variables
//const links = {};//Store original links and their short versions
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

    hashedText = fullUrl + HashString(inputText);

    //links[inputText] = hashedText;//Add hashed url in dictionary

    //Set current links
    currOriginalLink = inputText;
    currShortLink = hashedText


    mongooseDb.AddToDb(currOriginalLink, currShortLink);

    res.redirect("/short");
})

//Short GET
app.get("/short", async function(req,res){
    var linkObject = await mongooseDb.Find(currShortLink);
    //console.log(linkObject);
    res.render("short", {shortLink: linkObject.shortenedLink, originalLink: linkObject.originalLink});
})


//Link GET
app.get("/:link", async function(req, res){
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; //Get full page url
    //console.log(fullUrl + req.params.link);
    // res.writeHead(301, {
    //     Location: currOriginalLink
    //   }).end();

     //var redUrl = fullUrl + "/" + req.params.link;
     console.log(fullUrl);
     var linkObject = await mongooseDb.Find(fullUrl);
     console.log(linkObject);
      res.writeHead(301, {
        Location: linkObject.originalLink
      }).end();
})

//Hashing string
function HashString(text){
    const hash = crypto.createHash("sha256");
    hash.update(text);
    const hashedText = hash.digest('hex');

    return hashedText.slice(0,8);
}

//Connect to port
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});