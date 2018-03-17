
var userModel 							= require('./db/tableschemamodel/userModel');
var rolesModel 							= require('./db/tableschemamodel/rolesModel');
var companyModel 						= require('./db/tableschemamodel/companyModel');
var userCompanyRoleModel 				= require('./db/tableschemamodel/userCompanyRoleModel');
var companyTaskEvaluationModel 			= require('./db/tableschemamodel/companyTaskEvaluationModel');
var userTaskEvaluationModel 			= require('./db/tableschemamodel/userTaskEvaluationModel');
var companyCategoryModel 				= require('./db/tableschemamodel/companyCategoryModel');
var settingsModel 						= require('./db/tableschemamodel/settingsModel');
var appraisalMasterFormModel 			= require('./db/tableschemamodel/appraisalMasterFormModel');
var appraisalFinalFormModel 			= require('./db/tableschemamodel/appraisalFinalFormModel');
var companyAppraisalFinalFormModel 		= require('./db/tableschemamodel/companyAppraisalFinalFormModel');
var companyAppraisalMasterFormModel 	= require('./db/tableschemamodel/companyAppraisalMasterFormModel');
var userAppraisalModel 					= require('./db/tableschemamodel/userAppraisalModel');
var userAppraisalReferenceModel 		= require('./db/tableschemamodel/userAppraisalReferenceModel');

var jwt 			= 	require('jwt-simple');
var jwtauth 		= 	require('./modules/auth/jwtauth.js');
var bodyParser 		= 	require('body-parser');
var companyManager 	= 	require('./modules/company/companyManager');
var roleManager 	= 	require('./modules/role/roleManager');
var userManager 	= 	require('./modules/user/userManager');
var config 			= 	require('./config/config.json');
var utils 			= 	require('./config/utils.js');
var lodash 			= require('lodash');
var fs 				= 	require('fs');
var pdf 			= require('html-pdf');
require('date-util');

function REST_ROUTER(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {
	var self = this;
	
	router.post("/login", function(req, res) {
	    try{
	    	console.log("UserName: "+req.body.userName + " Password: " + req.body.password);
	    	
	    	userModel.findOne({
	            where : {
	                userName : req.body.userName
	            }
	        }).then(function(foundUser) {
	            var userInput = JSON.parse(JSON.stringify(req.body));
	            if (!foundUser) {
	            	console.log("Authentication failed. User not found: " );
	                res.json({ success: false, message: 'Authentication failed. User not found.' });
	            }  else if (foundUser) {

	                // check if password matches
	                if (foundUser.password != md5(userInput.password)) {
	                	console.log("Authentication failed. Wrong password. " );
	                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	                } else {
	                	console.log("Token Generated: " );
	                	 foundUser = JSON.parse(JSON.stringify(foundUser));
	                	userCompanyRoleModel.findAll({
	                		include: [
	                    		{ model: companyModel, attributes: ['companyId', 'name']},
	                    		{ model: rolesModel, attributes: ['id', 'roleName']}
	                		],
	                		where : {
	                			userId : foundUser.id
	                		}
	                	}).then(function(foundObject) {

	    	                if (foundObject.length) {
		                		foundUser.roleId = foundObject[0].role.id;
		                		foundUser.roleName = foundObject[0].role.roleName;
		                		foundUser.companyId =  foundObject[0].company.companyId;
		                		foundUser.companyName =  foundObject[0].company.name;   
	                		}
	                	    var token = jwt.encode({
			                      iss: foundUser.id,
			                      exp: new Date(new Date().strtotime("+1 day"))
			                    }, config.tokenString);

			                    res.json({
			                      token : token,
			                      user: foundUser
			                    });
	                	});
	                }
	            }
	        });
	    }
	    catch (ex) {
	        res.json({
	            "status"     : config.status.ERROR,
	            "message"   : ex
	        });
	    }
	});

	
	/*
	 * 
	 * Get pdf file sample.
	 * 
	 */
	router.post("/test/generatePdf", function(req, res) {
		console.log("INCOMING REQUEST: " + JSON.parse(req.body));
		
		var appraisalData = JSON.parse((req.body.appraisalData));
		var recommendation = JSON.parse((req.body.recommendation));
		
		var a = JSON.parse((req.body));
		
		console.log(appraisalData);
		console.log(recommendation);
		console.log(a);
		
		console.log("generatePdf : ");
		
		var htmlString = "<!DOCTYPE html>" +
				"<html>" +
				"<head>" +
				"<title>Page Title</title>" +
				"</head>" +
				"<body>" +
				"<h1>This is a Heading</h1>" +
				"<p>This is a paragraph.</p>" +
				"</body>" +
				"</html>";
				
		console.log(htmlString);
		
		var options = {
				format: 'Letter' 
			};
		pdf.create(htmlString, options).toFile('./businesscard.pdf', function(err, res) {
		  if (err) {
			  return console.log(err);
		  }
		  console.log(res); 
		});
				
		var file = fs.createReadStream('./businesscard.pdf');
		var stat = fs.statSync('./businesscard.pdf');
		res.setHeader('Content-Length', stat.size);
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
		res.download('./businesscard.pdf');
				
	});


};

module.exports = REST_ROUTER;
