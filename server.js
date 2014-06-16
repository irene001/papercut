#!/bin/env node
var express = require('express');
var papercut = require('./routes/papercut');
var http = require('http');
var path = require('path');
var config = require('./config');

var app = express();

// all environments
//app.set('port', process.env.PORT || config.get('port'));
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//app.set('port',process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', papercut.index);
app.post('/saveMessage', papercut.saveMessage);
app.get('/papercut/:id', papercut.openMessage);



http.createServer(app).listen(port, ipaddr, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
