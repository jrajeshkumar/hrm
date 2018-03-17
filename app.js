var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var md5 = require('md5');
var Rest = require("./REST.js");
var CompanyRestRouter = require("./router/companyRestRouter.js");
var RoleRestRouter = require("./router/roleRestRouter.js");
var TaskRestRouter = require("./router/taskRestRouter.js");
var UserRestRouter = require("./router/userRestRouter.js");
var AppraisalRestRouter = require("./router/appraisalRestRouter.js");

var sequelize = require('./db/dbconnection/sequelize');
var PropertiesReader = require('properties-reader');
var properties = new PropertiesReader('./config/properties/app.properties');
var AppConstant = require('./config/constant/appconstant');
var router = express.Router();
var jwtauth = require('./modules/auth/jwtauth.js');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var socket = require('socket.io');
var app = express();
var angapp = express();

function REST(allowURL) {
	var self = this;
	self.allowURL = allowURL || {};
	self.connectSequelize();
}

REST.prototype.connectSequelize = function() {
	var self = this;
	self.configureExpress(sequelize);

};

REST.prototype.configureExpress = function(sequelize) {
	var self = this;
	app.use(bodyParser.urlencoded({
		extended : true
	}));
	app.use(bodyParser.json());
	var rest_router = new Rest(router, sequelize, md5);
	// app.use('/api', [ jwtauth ], router);
	app.use('/api', [ jwtauth, function(err, req, res, next) {
		if (err) {
			if (self.allowURL.hasOwnProperty(req.url)) {
				next();
			} else {
				next(err);
			}
		} else {
			next();
		}
	} ], router);
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		console.log(JSON.stringify(err));
		res.json({
			message : err.message,
			error : err
		});
	});
	angapp.use('/', express.static('../client'));
	angapp.use('/client', express.static('../client'));
	var tastRestRouter = new TaskRestRouter(router);
	var userRestRouter = new UserRestRouter(router);
	var roleRestRouter = new RoleRestRouter(router);
	var appraisalRestRouter = new AppraisalRestRouter(router);
	var companyRestRouter = new CompanyRestRouter(router);
	self.startServer();
};

REST.prototype.startServer = function() {
	var server = require('http').createServer(app);
	socket = socket(server);
	socket.use(function(socket, next) {
		var handshakeData = socket.handshake;
		// console.log(handshakeData);
		// make sure the handshake data looks good as before
		// if error do this:
		// next(new Error('not authorized');
		// else just call next
		next('', true);
	});
	var v = '';
	socket.on('connection', function(appsocket) {
		var handshakeData = appsocket.handshake;
//		console.log(handshakeData);
		appsocket.join(handshakeData.query.userName);
//		console.log(' Task add.', handshakeData.query.userName);
//		appsocket.to('softwaredeveloper').emit('Task',
//				handshakeData.query.userName);
//		appsocket.emit('Task', appsocket.id);
//		v = appsocket.id;
//		socket.to(v).emit('Task', 'console');
	});
	app.set('socket', socket);
	server.listen(properties.get('server.portnumber'), function() {
		console.log("Node server started: Listening at port: "
				+ properties.get('server.portnumber'));
	});
	angapp.listen(properties.get('server.angappportnumber'), function() {
		console.log("ang server started: Listening at port: "
				+ properties.get('server.angappportnumber'));
	});
};

REST.prototype.stop = function(err) {
	console.log("ISSUE WITH Sequelize \n" + err);
	process.exit(1);
};

/*
 * 
 * To support cross origin.
 * 
 */
function crossOrigin(req, res, next) {
	var allowHeaders = [ 'Accept', 'Accept-Version', 'Content-Type',
			'Content-MD5', 'Content-Length', 'Response-Time', 'Api-Version',
			'Origin', 'X-Requested-With', 'Authorization' ];
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", allowHeaders.join(', '));
	res.header("Access-Control-Allow-Credentials", true);
	res.header('Access-Control-Allow-Methods',
			'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	if ('OPTIONS' == req.method) {
		res.sendStatus(200);
	} else {
		return next();
	}
}
app.all('*', crossOrigin);
var allowURL = {
	'/login' : 'login'
};
new REST(allowURL);
