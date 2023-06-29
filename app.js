const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const index = require("./public/js/index");

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

const links = {};//Store original links and their short versions
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

    links[inputText] = hashedText;//Add hashed url in dictionary

    //Set current links
    currOriginalLink = inputText;
    currShortLink = hashedText

    res.redirect("/short");
})

//Short GET
app.get("/short", function(req,res){
    res.render("short", {shortLink: currShortLink, originalLink: currOriginalLink});
})


//Link GET
app.get("/:link", function(req, res){
    //const originalLink = getKeyByValue(links, req.params.link);
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