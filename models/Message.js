var redis = require("redis");
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

exports.save = function(msg){
    client.set("test_key", msg);// todo: generate id automatically
}

exports.find = function(id){// todo: choose correct implementation
    client.unref()//todo: check it out in documentation
    client.get(id, function (err, value){
        if (err) throw(err)
        return value;
    });
}