const crypto = require("crypto");


exports.HashString = function(text){
    const hash = crypto.createHash("sha256");
    hash.update(text);
    const hashedText = hash.digest('hex');

    return hashedText.slice(0,8);
}