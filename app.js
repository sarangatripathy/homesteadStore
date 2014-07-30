/*jshint node:true */
/**
 * Module dependencies.
 */
var express = require('express'),
    routes = require('./routes'),
    pages = require('./routes/controller'),
    http = require('http'),
    path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

// Defines the routes for the app
app.get('/', routes.index);
app.get('/bikes', pages.bikes);
//app.get('/bikes', routes.bikes);
//app.get('/bikes', function (req, res) {res.render('bikes')});
app.get('/contact', function (req, res) {res.render('contact')});
//app.get('/specials', function (req, res) {res.render('test')});



app.get("/api/special", routes.getSpecial);
app.post("/api/special", routes.setSpecial);
app.get("/api/inventory", routes.getInventory);
app.get("/api/specials", routes.getSpecials);
//app.get("/api/sales", routes.getSales);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
