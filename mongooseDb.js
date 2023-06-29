// const mongoose = require("mongoose");


// mongoose.connect("mongodb://127.0.0.1:27017/links");
//     const Link = mongoose.model("Link", 
//     { 
//         originalLink:{
//             type: String,
//             required: true,
//             unique: true
//         },
//         shortenedLink:{
//             type: String,
//             required: true,
//             unique: true
//         } 
        
//     });

// function ConnectToDb(){
//     // mongoose.connect("mongodb://127.0.0.1:27017/links");
//     // const Link = mongoose.model("Link", 
//     // { 
//     //     originalLink:{
//     //         type: String,
//     //         required: true,
//     //         unique: true
//     //     },
//     //     shortenedLink:{
//     //         type: String,
//     //         required: true,
//     //         unique: true
//     //     } 
        
//     // });
// }


// exports.AddToDb = function(originalLink, shortenedLink){
//     console.log("0:   " + !ExistInDb(shortenedLink));
//     if(!ExistInDb(shortenedLink)){
//         const newLink = new Link({ originalLink: originalLink, shortenedLink: shortenedLink });
//         newLink.save().then(() => console.log("Link saved successfully"));
//     }
//     else{
//         console.log("Item already exist in db");
//     }

// }

// async function ExistInDb (shortenedLink){
//     // var link = await Find(shortenedLink);
//     const link = await Link.findOne({shortenedLink: shortenedLink}).exec();
//     console.log(link);
//     return link !== null;
// }

// function Find (shortenedLink){
//     // var link = Link.find({ shortenedLink : shortenedLink}, function( err, docs ){
//     //     if(err){
//     //         return null;
//     //     }
//     //     else{
//     //         return docs;            
//     //     }
//     // });

//     var link = Link.findOne({
//         shortenedLink : shortenedLink
//     });

//     //console.log(link);

//     return link;
// }

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/links");

const Link = mongoose.model("Link", {
  originalLink: {
    type: String,
    required: true,
    unique: true,
  },
  shortenedLink: {
    type: String,
    required: true,
    unique: true,
  },
});

exports.AddToDb = async function (originalLink, shortenedLink) {
  if (!(await ExistInDb(shortenedLink))) {
    const newLink = new Link({ originalLink: originalLink, shortenedLink: shortenedLink });
    newLink.save().then(() => console.log("Link saved successfully"));
  } else {
    console.log("Item already exists in the database");
  }
};

async function ExistInDb(shortenedLink) {
  const link = await Link.findOne({ shortenedLink: shortenedLink }).exec();
  return link !== null;
}

exports.Find = async function (shortenedLink) {
  return await Link.findOne({ shortenedLink: shortenedLink }).exec();
}
