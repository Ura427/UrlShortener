//imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//modules
const mongooseDb = require("./mongooseDb"); 
const cryptography = require("./cryptography");
const urlValidation = require("./urlValidation");

//const index = require("./public/js/index");

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
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; //Get full page url
    const hashedText = fullUrl + cryptography.HashString(inputText);

    //Set current links
    currOriginalLink = inputText;
    currShortLink = hashedText

    if(urlValidation.isValidUrl(currOriginalLink)){
        mongooseDb.AddToDb(currOriginalLink, currShortLink);
        res.redirect("/short");
     } else{
        //index.clearAndFocus();
        //res.render("index", { errorMessage: "This link is invalid" });
        //console.log("This link is invalid");
     }
})

//Short GET
app.get("/short", async function(req,res){
    var linkObject = await mongooseDb.Find(currShortLink);

    res.render("short", {shortLink: linkObject.shortenedLink, originalLink: linkObject.originalLink});
})


//Link GET
app.get("/:link", async function(req, res){
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const linkObject = await mongooseDb.Find(fullUrl);

    const link = linkObject.originalLink;

    res.writeHead(301, {
        Location: link
        }).end();
})


//Connect to port
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});