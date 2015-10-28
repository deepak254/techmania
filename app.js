/**
 * Module dependencies.
 */

//Main module which runs the whole application:: Deepak Tiwari


var express = require('express')
 , routes = require('./routes')
  , routepath = require('./routes/tech_route')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');


//modules imported from node_modules directory.
  //var mongoose = require('mongoose');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var logger=require('morgan');
var errorhandler = require('errorhandler');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');
var  passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passport_http = require('passport-http');
 var flash = require('connect-flash');
 var session = require('express-session');
 var socketio = require('socket.io');
//var mongoose = require('mongoose');
//var myroom=require('./model/roommodel');




//var Room=require('./model/room');


var app = express();


//app.use(cookieParser('secret'));
//app.use(session({cookie: { maxAge: 60000 }}));
//app.use(flash());

  app.use(express.static(path.join(__dirname, 'public')));
 // app.use(express.static(path.join(__dirname, 'views')));
  app.use(cookieParser());
  app.use(bodyParser()); 
  //app.use(bodyParser.json());
  app.use(session({ secret: 'mysecretkey' }));
  app.use(flash()); 
  app.use(passport.initialize());
  app.use(passport.session());
  
  
//var rooms=myroom.rooms;
// all environments
app.use(methodOverride('X-HTTP-Method-Override'));



if (process.env.NODE_ENV === 'development') {

	
	//  // only use in development
//	app.use(function(err, req, res, next) {
//		if (err instanceof UploadError) {
//			console.log('middleware ');
//	        res.render('./resources/uploaderror');
//	    } else {
//	        next(err);
//	    }
////	    res.status(err.status || 500);
//	});
}

app.use('/',routepath.router);


 app.enable('trust proxy');
 app.set('port', process.env.PORT || 3000);
 app.set('views', __dirname + '/views');
 app.set('view engine', 'ejs');
 






var server=http.createServer(app).listen( process.env.PORT || 3000, function(){
  
  console.log('Express server listening on port ' + app.get('port'));

});
//routepath.listen(server);







//module.exports = app;


