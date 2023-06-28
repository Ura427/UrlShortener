const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const index = require("./public/js/index");

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

const links = {};
var currShortLink = "";
var currOriginalLink = "";

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const inputText = req.body.link;

    
    links[inputText] = HashString(inputText);
    
    // links["https://www.youtube.com"] = HashString("https://www.youtube.com");

    // for(var key in links){
    //     var value = links[key];
    //     console.log("Key: " + key + " Value: " + value);
    // }
    
    currOriginalLink = inputText;
    currShortLink = HashString(inputText);

    console.log("0:   " + currOriginalLink);
    console.log("0:   " + currShortLink);
})


app.get("/short", function(req,res){
    //res.sendFile(__dirname + "/short.html");
    console.log("1:   " + currOriginalLink);
    console.log("1:   " + currShortLink);
    res.render("short", {shortLink: currShortLink, originalLink: currOriginalLink});
})

function HashString(text){
    const hash = crypto.createHash("sha256");
    hash.update(text);
    const hashedText = hash.digest('hex');

    return hashedText.slice(0,8);
}


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});