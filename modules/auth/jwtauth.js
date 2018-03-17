var userModel = require('./../../db/tableschemamodel/userModel');
var jwt = require('jwt-simple');
var config = require('./../../config/config.json');

module.exports = function(req, res, next) {
//	console.log(req.headers);
	var token = (req.body && req.body.access_token)
			|| (req.query && req.query.access_token)
			|| req.headers['x-access-token'] || req.headers['authorization'];
	if (token) {
		try {
			console.log("TOKEN___", token);
			console.log("decoded___", token, config.tokenString);
			console.log(jwt.decode(token, config.tokenString));
			var decoded = jwt.decode(token, config.tokenString);

			if (decoded.message == "Token expired"||decoded.exp <= Date.now()) {
				var err = new Error("Access token has expired.");
				err.status = 403;
				return next(err);
//				res.end('Access token has expired', 400);
			}
//			if (decoded.exp <= Date.now()) {
//				res.end('Access token has expired', 400);
//			}
			userModel.findOne({
				where : {
					id : decoded.iss
				}
			}).then(function(user) {
				if (user) {
					req.user = user;
					return next();
				} else {
					var err = new Error("Authentication Failed.");
					err.status = 403;
					return next(err);
					// res.status(403);
					// res.end("Authentication Failed.");
				}
			});

		} catch (err) {
			err.status = 403;
			return next(err);
			// res.status(err.status || 500);
			// res.end("Authentication Failed.", err);
		}
	} else {
		var err = new Error("Authentication Failed.");
		err.status = 403;
		return next(err);
		// res.status(401);
		// res.end("Authentication Failed.");
	}
};