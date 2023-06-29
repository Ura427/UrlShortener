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
