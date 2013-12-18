var msgModel = require('./../models/Message');
var config = require('./../config');
var async = require('async');

var UNDEFINED_LETTER_PATH = "undefined1.png"

exports.index = function(req, res){
    console.log("index page");
    res.render('index', { title: 'Papercut' , div: "", pic: 'images/default.jpg'});
};

exports.saveMessage = function (req, res) {
    console.log("generate image");
    var msg = req.body.message;
    msgModel.save(msg, function (key) {
        res.redirect('/papercut/' + key);
    });
};

exports.openMessage = function (req, res) {
    var images = [];

    msgModel.find(req.params.id, parseMessage);

    function parseMessage(err, msg) {
        msg = msg.toLowerCase();
        var callbacks = [];

        for (var i = 0; i < msg.length; i++) {
            var letter = msg.charAt(i);
            callbacks.push(searchByLetter(letter));
        }

        function searchByLetter(letter) {
            return function (callback) {
                msgModel.findImgPath(letter === ' ' ? 'space' : letter, processLetter(callback));
            }
        }

        async.parallel(callbacks, function (err) {
            if (err) {
                throw err;
            }
            res.render('canvas', { title: 'Message', sources: images});
        });
    }

    function processLetter(callback) {
        return function (err, letterPath) {
            if (!letterPath) {
                letterPath = UNDEFINED_LETTER_PATH;
            }
            console.log("images: " + config.get('imageHost') + letterPath);
            images.push(config.get('imageHost') + letterPath);
            callback();
        }
    }
}







