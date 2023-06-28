const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const index = require("./public/js/index");

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true}));


const links = {};

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const inputText = req.body.link;

    //index(inputText);

    // const hash = crypto.createHash("sha256");
    // hash.update(inputText);
    // const hashedText = hash.digest('hex');

    //console.log(hashedText.slice(0,8));

    // links[inputText] = hashedText.slice(0,8);
    // links["https://www.youtube.com"] = "https://www.youtube.com";

    links[inputText] = HashString(inputText);
    links["https://www.youtube.com"] = HashString("https://www.youtube.com");

    for(var key in links){
        var value = links[key];
        console.log("Key: " + key + " Value: " + value);
    }
    
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