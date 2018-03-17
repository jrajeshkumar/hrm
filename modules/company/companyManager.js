/**
 * http://usejsdoc.org/
 */

var companyModel 	= 	require('./../../db/tableschemamodel/companyModel');
var FS 				= 	require('fs');
var config			=	require('./../../config/config.json');
var utils 			= 	require('./../../config/utils');


function createCompany(companyInput, callback) {
    var companyId 	= 	utils.uid(6);
	companyInput.companyId 	=	companyId;
	if(companyInput.logo && companyInput.logo != "") {
		try{
			var imageData 	= 	FS.readFileSync("/home/web-hp-004/nodejsexpress/CourseLogoSuperHero_3.jpg");
			companyInput.logo 	=	imageData;
		}
		catch(err){
			return callback({
				Status	:	"Error",
				Message :	err
			});
		}
	}
	var companyDetails	=	companyModel.build(companyInput);
	var result	=	{};
	companyDetails.save().then(function(companyData) {
		result.status	=	config.status.SUCCESS;
		result.message	=	companyData;
		if(companyData == '') {
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		}
		return callback( result );
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback( result );
	});
}

function getCompanyDetails(companyInput, callback) {
	console.log("REQ___PARAM___",companyInput);
	var condition = {};
	condition.where = 	{};
	if(companyInput) {
	condition.where	=	companyInput;
	}
	var result	=	{};
	console.log("CONDITION____",condition);
	companyModel.findAll(condition).then(function(companyData) {
		result.status	=	config.status.SUCCESS;
		result.message	=	companyData;
		if(companyData == '') {
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		}
		return callback( result );
	}).catch(function(err){
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback( result );
	});
}

function editCompanyDetails(queryData, companyInput, callback) {
	console.log("PARAMSS____",queryData);
	console.log("BODYYYY____",companyInput);
	if(companyInput.logo && companyInput.logo != "") {
		try{
			var imageData 	= 	FS.readFileSync("/home/web-hp-004/nodejsexpress/CourseLogoSuperHero_3.jpg");
			companyInput.logo 	=	imageData;
		}
		catch(err){
			return callback({
				Status	:	"Error",
				Message :	err
			});
		}
	}
	var set		=	companyInput;
	var condition 	=	{};
	condition.where = 	{};
	condition.where	=	queryData;
	var result	=	{};
	companyModel.update(set, condition).then(function(item) {
		result.status	=	config.status.SUCCESS;
		result.message	=	item;
		if(item[0] == 0) {
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		}
		return callback( result );
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback( result );
	});
}




module.exports = {
	    getCompanyDetails	: getCompanyDetails,
	    editCompanyDetails	: editCompanyDetails,
	    createCompany		: createCompany 
	};
