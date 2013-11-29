var msgModel = require('./../models/Message');

exports.index = function(req, res){
    console.log("index page");
  res.render('index', { title: 'Papercut' });
};

exports.open = function(req, res) {
    msgModel.find(req.params.id);
    res.render("papercut.html");// todo: open correct screen
}

exports.generate = function(req, res) {
    console.log("generate image");
    var msg = req.body.message;
    msgModel.save(msg);
    res.redirect('/');// TODO: we should generate link, display it on the index page(on the current page)
}


