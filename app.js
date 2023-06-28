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
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    hashedText = fullUrl + HashString(inputText);

    links[inputText] = hashedText;

    currOriginalLink = inputText;
    currShortLink = hashedText

    res.redirect("/short");
})


app.get("/short", function(req,res){
    // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    res.render("short", {shortLink: currShortLink, originalLink: currOriginalLink});
})



app.get("/:link", function(req, res){
    //const originalLink = getKeyByValue(links, req.params.link);
    // console.log("1:  " + originalLink);
    // res.redirect(originalLink);
    console.log("1:  " + currOriginalLink);
    //res.redirect(currOriginalLink);
    res.writeHead(301, {
        Location: currOriginalLink
      }).end();
})


function HashString(text){
    const hash = crypto.createHash("sha256");
    hash.update(text);
    const hashedText = hash.digest('hex');

    return hashedText.slice(0,8);
}

// function getKeyByValue(object, value) {
//     return Object.keys(object).find(key => object[key] === value);
//   }

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});