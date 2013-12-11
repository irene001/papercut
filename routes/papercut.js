var msgModel = require('./../models/Message');
var config = require('./../config');

exports.index = function(req, res){
    console.log("index page");
    res.render('index', { title: 'Papercut' , div: "Corrected message:", pic: 'images/default.jpg'});
};

exports.openMessage = function(req, res) {
    var count = 0;
    msgModel.find(req.params.id, function (err, msg){
        for (var i = 0; i < msg.length; i++) {
            //todo: handle 'enter' //todo: handle not found // todo: handle dot and space
            var letter = msg.charAt(i);
            msgModel.findImgPath(letter === ' '? 'space' : letter, function(err, letterPath){
                if (!letterPath) {
                    letterPath = "eP2q-vQFbV/undefined1.png";
                }
                res.write("<img src='" + config.get('imageHost') + letterPath + "'/>");
                console.log("images: " + config.get('imageHost') + letterPath);
                count++;
                if (count == msg.length) res.end();// todo: fix it
            });
        }
    });
}

exports.saveMessage = function(req, res) {
    console.log("generate image");
    var msg = req.body.message;
    msgModel.save(msg);
    msgModel.load('test_key', function(value){
        res.render('index', { title: 'Papercut' , div: "Corrected message: " + value, pic: 'images/e.jpg'});
    });
};






