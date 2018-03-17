var roleModel 	= 	require('./../../db/tableschemamodel/rolesModel.js');
var config			=	require('./../../config/config.json')


function getUserRole(roleInput, callback)  {
	console.log("REQ___PARAM___",roleInput);
	var condition = {};
	condition.where = 	{};
	condition.where	=	roleInput;
	var result	=	{};
	console.log("CONDITION____",condition);
	roleModel.findAll(condition).then(function(roleData) {
		result.status	=	config.status.SUCCESS;
		result.message	=	roleData;
		if(roleData == ''){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		}
		return callback( result );
	}).catch(function(err){
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message
		return callback( result );
	});
}

function editUserRole(queryData, roleInput, callback) {
	console.log("PARAMSS____",queryData);
	console.log("BODYYYY____",roleInput);
	var set		=	roleInput;
	var condition 	=	{};
	condition.where = 	{};
	condition.where	=	queryData;
	var result	=	{};
	roleModel.update(set, condition).then(function(item) {
		result.status	=	config.status.SUCCESS;
		result.message	=	item;
		if(item[0] == 0){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		}
		return callback( result );
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message
		return callback( result );
	});
}

function createUserRole(roleInput, callback) {
	var roleDetails	=	roleModel.build(roleInput);
	var result	=	{};
	roleDetails.save().then(function(roleData) {
		result.status	=	config.status.SUCCESS;
		result.message	=	roleData;
		if(roleData == ''){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		}
		return callback( result );
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message
		return callback( result );
	});
}


module.exports = {
	    getUserRole		: getUserRole,
	    editUserRole	: editUserRole,
	    createUserRole	: createUserRole
	};
