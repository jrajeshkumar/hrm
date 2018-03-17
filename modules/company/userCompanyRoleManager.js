/**
 * userCompanyRoleManager handles all userCompanyRole related database
 * operations.
 */

var config = require('./../../config/config.json');

var userModel = require('./../../db/tableschemamodel/userModel');
var userCompanyRoleModel = require('./../../db/tableschemamodel/userCompanyRoleModel');
var userModel = require('./../../db/tableschemamodel/userModel');
var rolesModel = require('./../../db/tableschemamodel/rolesModel');
var companyModel = require('./../../db/tableschemamodel/companyModel');


function createUserCompanyRole(userCompanyRoleInput, callback) {
	var userCompanyRoleDetails	=	userCompanyRoleModel.build(userCompanyRoleInput);
	var result	=	{};
	userCompanyRoleDetails.save().then(function(userCompanyRoleData) {
		if(userCompanyRoleData == '') {
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;			
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	userCompanyRoleData;
		}
		return callback(result);
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback( result);
	});
}
function getUserCompanyRole(userCompanyRoleInput, callback) {
	var result	=	{};
	userCompanyRoleModel.findAll({
	               	include: [{ model: userModel, attributes: ['id', 'joinedDate','userName', 'employeeId']},
	                   	{ model: companyModel, attributes: ['companyId', 'name']},
	                   	{ model: rolesModel, attributes: ['id', 'roleName']}
	               	],
	               	where : userCompanyRoleInput
	                }).then(function(userCompanyRoleData) {
	if(userCompanyRoleData == '') {
	result.status	=	config.status.ERROR;
	result.message	=	config.status.NoResult;	
	} else {
	result.status	=	config.status.SUCCESS;
	result.message	=	userCompanyRoleData;
	}
	return callback(result);
	               	}).catch(function(err) {
	console.log("ERROR:",err.message);
	result.status	=	config.status.ERROR;
	result.message	=	err.message;
	return callback( result);
	});
	}


module.exports = {
		createUserCompanyRole		: createUserCompanyRole,
		getUserCompanyRole	: getUserCompanyRole
	};