//imports
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const mongoose = require("mongoose");

//modules
//const index = require("./public/js/index");
const mongooseDb = require("./mongooseDb"); 

//app uses
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

//global variables
const links = {};//Store original links and their short versions
var currShortLink = "";
var currOriginalLink = "";


//mongoose
// mongoose.connect("mongodb://127.0.0.1:27017/links");
// const Link = mongoose.model("Link", 
// { 
//     originalLink:{
//         type: String,
//         required: true,
//         unique: true
//     },
//     shortenedLink:{
//         type: String,
//         required: true,
//         unique: true
//     } 
    
// });


//Home GET
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html"); 
})

//Home POST
app.post("/", function(req, res){
    const inputText = req.body.link;//Get input text value
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; //Get full page url

    hashedText = fullUrl + HashString(inputText);

    links[inputText] = hashedText;//Add hashed url in dictionary

    //Set current links
    currOriginalLink = inputText;
    currShortLink = hashedText


    mongooseDb.AddToDb(currOriginalLink, currShortLink);

    //mongoose
    // const newLink = new Link({ originalLink: currOriginalLink, shortenedLink: currShortLink });
    // newLink.save().then(() => console.log("Link saved successfully"));

    res.redirect("/short");
})

//Short GET
app.get("/short", async function(req,res){
    var linkObject = await mongooseDb.Find(currShortLink);
    //res.render("short", {shortLink: currShortLink, originalLink: currOriginalLink});
    console.log(linkObject);
    res.render("short", {shortLink: linkObject.shortenedLink, originalLink: linkObject.originalLink});
})


//Link GET
app.get("/:link", function(req, res){

    res.writeHead(301, {
        Location: currOriginalLink
      }).end();
})

//Hashing string
function HashString(text){
    const hash = crypto.createHash("sha256");
    hash.update(text);
    const hashedText = hash.digest('hex');

    return hashedText.slice(0,8);
}

// function getKeyByValue(object, value) {
//     return Object.keys(object).find(key => object[key] === value);
//   }

//Connect to port
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});