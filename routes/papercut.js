var msgModel = require('./../models/Message');
var config = require('./../config');

exports.index = function(req, res){
    console.log("index page");
    res.render('index', { title: 'Papercut' , div: "Corrected message:", pic: 'images/default.jpg'});
};

exports.openMessage = function(req, res) {
    var count = 0;
    var images = [];
    msgModel.find(req.params.id, function (err, msg){
        for (var i = 0; i < msg.length; i++) {
            //todo: handle 'enter' //todo: handle not found // todo: handle dot and space
            var letter = msg.charAt(i);
            msgModel.findImgPath(letter === ' '? 'space' : letter, function(err, letterPath){
                if (!letterPath) {
                    letterPath = "eP2q-vQFbV/undefined1.png";
                }
                console.log("images: " + config.get('imageHost') + letterPath);
                images.push(config.get('imageHost') + letterPath);
                count++;
                if (count == msg.length) {// todo: fix it
                    res.render('canvas', { title: 'Message' , sources: images});
                }
            });
        }
    });
}

exports.saveMessage = function(req, res) {
    console.log("generate image");
    var msg = req.body.message;
    msgModel.save(msg);
    res.redirect('/');

};






