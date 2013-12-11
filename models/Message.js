var redis = require("redis");
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

exports.save = function(msg){
    client.set('test_key', msg);
};

exports.load = function(key, callback) {
    client.unref();
    client.get('test_key', function (err, value){
        if (err) throw(err);
        console.log("messages: data from database "+value);
        callback(value);
        convert(value);
    });
};

exports.find = function(id){// todo: choose correct implementation
    client.unref();//todo: check it out in documentation
    client.get(id, function (err, value){
        if (err) throw(err);
        return value;
    });
};

convert = function(message) {
    console.log("first symbol: ", message.charAt(0));
    console.log("message length: ", message.length);
    for (var symbol in message) {
        console.log("symbol "+symbol+"equals to image "+symbol+"_image");

    }

};