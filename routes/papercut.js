var msgModel = require('./../models/Message');

exports.index = function(req, res){
    console.log("index page");
    res.render('index', { title: 'Papercut' , div: "Corrected message:", pic: 'images/default.jpg'});
};

exports.open = function(req, res) {
    msgModel.find(req.params.id);
    res.render("papercut.html");// todo: open correct screen
};

exports.generate = function(req, res) {

    console.log("generate image");
    var msg = req.body.message;
    msgModel.save(msg);
    msgModel.load('test_key', function(value){
        res.render('index', { title: 'Papercut' , div: "Corrected message: " + value, pic: 'images/e.jpg'});
    });
};






