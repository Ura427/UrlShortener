const express = require("express");
const bodyParser = require("body-parser");


const index = require("./public/js/index");

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const inputText = req.body.link;
    //console.log(inputText);
    index(inputText);
})


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});