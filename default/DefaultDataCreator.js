var redis = require("redis");
var defaultData;

var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});


init();

function init(){
    defaultData = require('./data.json');
    for(var letter in defaultData["alphabet"]){
        client.sadd(generateImageId(letter), defaultData["alphabet"][letter]);
    }
    client.quit();

}

function generateImageId(letter) {
    return "letter:letter:" + letter;
}


