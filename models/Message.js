var redis = require("redis");
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

exports.save = function(msg, callback){
    client.set("test_key", msg);// todo: generate id automatically. Change test_key to generated hash
    callback("test_key");
}

exports.find = function(id, event){
    var result = client.get(id, function(err, reply) {
        if (err) throw(err);// todo: handle error
        event(err, reply);
        return true;
    });
}

exports.findImgPath = function find (letter, event){
    var result = client.srandmember(generateImageId(letter), function(err, reply) {
        event(err, reply);
        return true;
    });
}

function generateImageId(letter) {
    return "letter:letter:" + letter;
}