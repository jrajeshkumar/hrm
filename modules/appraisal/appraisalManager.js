/**
 * http://usejsdoc.org/
 */

var appraisalMasterFormModel = require('./../../db/tableschemamodel/appraisalMasterFormModel');
var appraisalFinalFormModel = require('./../../db/tableschemamodel/appraisalFinalFormModel');
var companyAppraisalFinalFormModel = require('./../../db/tableschemamodel/companyAppraisalFinalFormModel');
var companyAppraisalMasterFormModel = require('./../../db/tableschemamodel/companyAppraisalMasterFormModel');
var userAppraisalModel = require('./../../db/tableschemamodel/userAppraisalModel');
var userAppraisalReferenceModel = require('./../../db/tableschemamodel/userAppraisalReferenceModel');
var companyAppraisalFinalFormModel = require('./../../db/tableschemamodel/companyAppraisalFinalFormModel');
var companyModel = require('./../../db/tableschemamodel/companyModel');
var rolesModel = require('./../../db/tableschemamodel/rolesModel');
var companyCategoryModel = require('./../../db/tableschemamodel/companyCategoryModel');
var userModel = require('./../../db/tableschemamodel/userModel');

var Sequelize = require("sequelize");
var sequelize = require('./../../db/dbconnection/sequelize.js');

var config = require('./../../config/config.json');
var utils = require('./../../config/utils');
var async = require('async');
var uuid = require('node-uuid');

function createAppraisalMasterForm(appraisalMasterFormInput, callback) {
	var appraisalMasterFormDetails =	appraisalMasterFormModel.build(appraisalMasterFormInput);
	var result	=	{};
	appraisalMasterFormDetails.save().then(function(appraisalMasterFormData) {
		if(appraisalMasterFormData == ''){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	appraisalMasterFormData;
		}
		return callback(result);
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback(result);
	});
}


function getAppraisalMasterForm(appraisalMasterFormInput, callback) {
	var condition = {};
	condition.where = 	{};
	condition.where	=	appraisalMasterFormInput;
	var result	=	{};
	appraisalMasterFormModel.findAll({
		where : {
			isDeleted : false
		}
	}).then(function(appraisalMasterFormData) {
		if(appraisalMasterFormData == ''){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	appraisalMasterFormData;
		}
		return callback(result);
	}).catch(function(err){
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback(result);
	});
}

function editAppraisalMasterForm(queryData, taskAppraisalInput, callback) {
	var set		=	taskAppraisalInput;
	var condition 	=	{};
	condition.where = 	{};
	condition.where	=	queryData;
	var result	=	{};
	appraisalMasterFormModel.update(set, condition).then(function(editAppraisalMasterFormRes) {
		if(editAppraisalMasterFormRes[0] == 0){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	editAppraisalMasterFormRes;
		}
		return callback( result );
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback( result );
	});
}

function deleteAppraisalMasterForm(queryData, taskAppraisalInput, callback) {
	var set		=	{isDeleted : true};
	var condition 	=	{};
	condition.where = 	{};
	condition.where	=	queryData;
	var result	=	{};
	appraisalMasterFormModel.update(set, condition).then(function(editAppraisalMasterFormRes) {
		if(editAppraisalMasterFormRes[0] == 0){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	editAppraisalMasterFormRes;
		}
		return callback( result );
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback( result );
	});
}

function createCompanyAppraisalMasterForm(companyAppraisalMasterFormInput, callback) {
	console.log("ORIGINAL REQUEST: " + JSON.stringify(companyAppraisalMasterFormInput));
	var formFieldRequest = companyAppraisalMasterFormInput;
	
	var companyAppraisalMasterForm = {};
	if(formFieldRequest.formFormat == 'TableFormat') {
		console.log("REQUEST TO CREATE A TABLE FORMAT TABLE :" + JSON.stringify(companyAppraisalMasterFormInput));

		for (var key in formFieldRequest) {
			 if (formFieldRequest.hasOwnProperty(key)) {
				 if(key == 'table_row') {
					 var tableRowArr = formFieldRequest.table_row;
					 for( var i = 0;  i < tableRowArr.length; i++ )  {
						delete tableRowArr[i]['data'];
						for (var innerKey in tableRowArr[i].Table_data) {
		    				if (tableRowArr[i].Table_data.hasOwnProperty(innerKey)) {
		    			    	if(innerKey == 'value') {
		    			    		delete tableRowArr[i].Table_data['value'];
		    			    	}
		    			    	if(innerKey == 'type') {
		    			    		delete tableRowArr[i].Table_data['type'];
		    			    	}
		    			    	if(innerKey == 'data') {
	    			    			var jsonVal = tableRowArr[i].Table_data.data[0];
	    			    			jsonVal.type = 'label';
	    			    			delete tableRowArr[i].Table_data.data[0];
	    			    			tableRowArr[i].Table_data.data[0] = jsonVal;
		    			    	}
		    			    }
	    			    }
					 }
				 }
			 }	
		}
		
		console.log("MODIFIED JSON OBJECT: " + JSON.stringify(formFieldRequest));
		
		companyAppraisalMasterForm.formLabel = formFieldRequest.formLabel;
		companyAppraisalMasterForm.formType = 'label';
		companyAppraisalMasterForm.formFormat = 'TableHeader';
		companyAppraisalMasterForm.parentId = 0;
		companyAppraisalMasterForm.formPageOrder = 5;
		companyAppraisalMasterForm.companyId = 1000;
		companyAppraisalMasterForm.categoryId = 1;
		
		var formInputValArr = formFieldRequest.table_header;
		var tabHeader = [];
		for(var i = 0; i < formInputValArr.length; i++) {
			console.log("formInputValArr['" + i + "'] : " + JSON.stringify(formInputValArr[i].value));
			tabHeader.push(formInputValArr[i].value);
		}
		companyAppraisalMasterForm.formInputValues = tabHeader.toString();
		
		var tableFormatTitle =	companyAppraisalMasterFormModel.build(companyAppraisalMasterForm);
		tableFormatTitle.save().then(function(companyAppraisalMasterFormData) {
			console.log("TABLE FORMAT INSERT RESPONSE : " + JSON.stringify(companyAppraisalMasterFormData));
				async.eachSeries(formFieldRequest.table_row, function(tableRowData, asynccallback) {
					console.log("TableRowData : " + JSON.stringify(tableRowData));					
					var emptyTableSubRowJson = {};
					emptyTableSubRowJson.formLabel = 'None';
					emptyTableSubRowJson.formType = 'label';
					emptyTableSubRowJson.formFormat = 'tr';
					emptyTableSubRowJson.parentId = companyAppraisalMasterFormData.id;
					emptyTableSubRowJson.formPageOrder = 0;
					emptyTableSubRowJson.companyId = companyAppraisalMasterFormData.companyId;
					emptyTableSubRowJson.categoryId = companyAppraisalMasterFormData.categoryId;
					var trSubRow = companyAppraisalMasterFormModel.build(emptyTableSubRowJson);
					trSubRow.save().then(function(trSubRowFormDataRes) {
						async.eachSeries(tableRowData.Table_data, function(tableDataRes, table_data_asynccallback) {
							console.log("1111 : " + JSON.stringify(tableDataRes));
							async.eachSeries(tableDataRes, function(rowValues, data_values_asynccallback) {
								console.log("222222 : " + JSON.stringify(rowValues));
							 	if(rowValues.type == 'label') {
									var formValuesLabel = {};
									formValuesLabel.formLabel = rowValues.value;
									formValuesLabel.formType = rowValues.type;
									formValuesLabel.formFormat = 'tr';
									formValuesLabel.parentId = trSubRowFormDataRes.id;
									formValuesLabel.formPageOrder = 0;
									formValuesLabel.companyId = companyAppraisalMasterFormData.companyId;
									formValuesLabel.categoryId = companyAppraisalMasterFormData.categoryId;
									var insertValLabel = companyAppraisalMasterFormModel.build(formValuesLabel);
									insertValLabel.save().then(function(insertedLabelRes) {});
								} else if(rowValues.type == 'checkbox' || rowValues.type == 'select' || rowValues.type == 'radio') {
									var formValuesCheckBoxSelect = {};
									formValuesCheckBoxSelect.formLabel = 'None';
									formValuesCheckBoxSelect.formType = rowValues.type;
									formValuesCheckBoxSelect.formFormat = 'td';
									formValuesCheckBoxSelect.parentId = trSubRowFormDataRes.id;
									formValuesCheckBoxSelect.formPageOrder = 0;
									formValuesCheckBoxSelect.formInputValues = rowValues.value.toString();
									formValuesCheckBoxSelect.companyId = companyAppraisalMasterFormData.companyId;
									formValuesCheckBoxSelect.categoryId = companyAppraisalMasterFormData.categoryId;
									var insertValCheckBoxSelect = companyAppraisalMasterFormModel.build(formValuesCheckBoxSelect);
									insertValCheckBoxSelect.save().then(function(insertedCheckBoxSelectRes) {});
								} else if(rowValues.type == 'input') {
									var formValuesInput = {};
									formValuesInput.formLabel = 'None';
									formValuesInput.formType = rowValues.type;
									formValuesInput.formFormat = 'td';
									formValuesInput.parentId = trSubRowFormDataRes.id;
									formValuesInput.formPageOrder = 0;
									formValuesInput.companyId = companyAppraisalMasterFormData.companyId;
									formValuesInput.categoryId = companyAppraisalMasterFormData.categoryId;
									var insertValInput = companyAppraisalMasterFormModel.build(formValuesInput);
									insertValInput.save().then(function(insertedInputRes) {});
								} 
								data_values_asynccallback();
							},function(){
								table_data_asynccallback(); 
							});
						},function() {
							asynccallback();
						});
					});
				}, function() {
					var result = {};
					result.status	=	config.status.SUCCESS;
			        return callback(result);
			    });
			});
		
	} else if(formFieldRequest.formFormat == 'StandardFormat') {
		console.log("REQUEST TO CREATE A STANDARD FORMAT TABLE :" + JSON.stringify(formFieldRequest));
		var companyAppraisalMasterFormStandardFormat = {};
		companyAppraisalMasterFormStandardFormat.formLabel = formFieldRequest.formLabel;
		companyAppraisalMasterFormStandardFormat.formType = 'label';
		companyAppraisalMasterFormStandardFormat.formFormat = 'StandardFormat';
		companyAppraisalMasterFormStandardFormat.parentId = 0;
		companyAppraisalMasterFormStandardFormat.formPageOrder = 5;
		companyAppraisalMasterFormStandardFormat.companyId = 1000;
		companyAppraisalMasterFormStandardFormat.categoryId = 1;
		
		var standardFormatTitle =	companyAppraisalMasterFormModel.build(companyAppraisalMasterFormStandardFormat);
		standardFormatTitle.save().then(function(companyAppraisalMasterFormStandardFormatRes) {
			async.eachSeries(formFieldRequest.standard, function(tableRowData, asynccallback) {
				var trDataStandardFormat = {};
				trDataStandardFormat.formLabel = tableRowData.value;
				trDataStandardFormat.formType = tableRowData.type;
				trDataStandardFormat.formFormat = null;
				trDataStandardFormat.parentId = companyAppraisalMasterFormStandardFormatRes.id;
				trDataStandardFormat.formPageOrder = 0;
				trDataStandardFormat.companyId = companyAppraisalMasterFormStandardFormat.companyId;
				trDataStandardFormat.categoryId = companyAppraisalMasterFormStandardFormat.categoryId;
				
				var trStandardFormatSubRows = companyAppraisalMasterFormModel.build(trDataStandardFormat);
				trStandardFormatSubRows.save().then(function(companyAppraisalMasterFormStandardFormatRes){});
				asynccallback();
			}, function() {
				var result = {};
				result.status	=	config.status.SUCCESS;
		        return callback(result);
		    });
		});
	}
}


 function getCompanyAppraisalMasterForm(companyAppraisalMasterFormInput, callback) {
	console.log("GET COMPANY APPRAISAL MASTER FORM ORIGINAL REQUEST: " + JSON.stringify(companyAppraisalMasterFormInput));
	var result	=	{};
	companyAppraisalMasterFormModel.findAll({
		where : {
			isDeleted : false,
			companyId : companyAppraisalMasterFormInput.companyId,
			parentId  : 0	 	
		}
	}).then(function(companyAppraisalMasterFormDataRes) {
		if(companyAppraisalMasterFormDataRes == ''){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
	        return callback(result);
		} else {
			var response = [];
			var titleDetailsGlobal = [];
			async.eachSeries(companyAppraisalMasterFormDataRes, function(companyAppraisalMasterFormData, asynccallback) {
				var titleDetails = {};
				console.log("companyAppraisalMasterFormData: " + JSON.stringify(companyAppraisalMasterFormDataRes));
				
				if(companyAppraisalMasterFormData.formFormat == 'StandardFormat') {
					titleDetails.id = companyAppraisalMasterFormData.id;
					titleDetails.formLabel = companyAppraisalMasterFormData.formLabel;
					titleDetails.formPageOrder = companyAppraisalMasterFormData.formPageOrder;
					titleDetails.formFormat = companyAppraisalMasterFormData.formFormat;
					var formValues = [];
					companyAppraisalMasterFormModel.findAll({
						where : { isDeleted : false, parentId : companyAppraisalMasterFormData.id }
					}).then(function(response) { 
						console.log("Response: " + JSON.stringify(response));
						formValues =response;	
						titleDetails.formValues = formValues;
						console.log("titleDetails : " + JSON.stringify(titleDetails));
						titleDetailsGlobal.push(titleDetails);
						asynccallback();
					});
				} else if(companyAppraisalMasterFormData.formFormat == 'TableHeader') {
					console.log("Table Format: " );
					titleDetails.id = companyAppraisalMasterFormData.id;
					titleDetails.formLabel = companyAppraisalMasterFormData.formLabel;
					titleDetails.formPageOrder = companyAppraisalMasterFormData.formPageOrder;
					titleDetails.formFormat = companyAppraisalMasterFormData.formFormat;
					var formValuesArr = [];
					var formValuesJson = [];
					var tableArr = [];
					var tableJson = {};
					var thead = [];
					var tbodyArr = [];
					var tbodyJson = {};
					
					var formIpValues = companyAppraisalMasterFormData.formInputValues.split(",");					
					var theadJson = {};
					theadJson= formIpValues;
					thead.push(theadJson)
					tableJson.thead = formIpValues;
					
					companyAppraisalMasterFormModel.findAll({
						where : { isDeleted : false, parentId : companyAppraisalMasterFormData.id }
					}).then(function(response) {
						console.log("1111111111 : " + JSON.stringify(response) + " : " + response.id);

						var tbodyValArr = [];
						async.eachSeries(response, function(responsecompany, subAsynccallback)  {
							companyAppraisalMasterFormModel.findAll({
								where : { isDeleted : false, parentId : responsecompany.id }
							}).then(function(subResponse) {
								console.log("222222222 : " + JSON.stringify(subResponse) + "  :  " + subResponse.length);
								
								var tbodyValJson = {};
								tbodyValJson.id = '';
								tbodyValJson.formLabel = '';
								tbodyValJson.formValues =[];
								var rowArr = [];
								for (var i = 0; i < subResponse.length; i++) {
									if(i == 0) {
										tbodyValJson.id = subResponse[0].id;
										tbodyValJson.formLabel = subResponse[0].formLabel;
										// tbodyValArr.push(tbodyValJson);
									} else {
										var valJson = {};
										valJson.type = subResponse[i].formType;
										valJson.value = subResponse[i].formInputValues;
										rowArr.push(valJson);
									}
								}

								tbodyValJson.formValues = rowArr;
								tbodyValArr.push(tbodyValJson);
								
								
								subAsynccallback();
							});
						}, function() {
							titleDetails.formValues = tableJson;
							tableJson.tbody = tbodyValArr;

							console.log(JSON.stringify(titleDetails));
							titleDetailsGlobal.push(titleDetails);
							asynccallback();
					    });
					});
				}
			}, function() {
				result.status	=	config.status.SUCCESS;
				result.message	=	titleDetailsGlobal;
				console.log("TITLE DETAILS GLOBAL : " + JSON.stringify(titleDetailsGlobal));
		        return callback(result);
		    });
		}
	}).catch(function(err){
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback(result);
	});
}


function editCompanyAppraisalMasterForm(queryData, companyAppraisalMasterFormInput, callback) {
	var set		=	companyAppraisalMasterFormInput;
	var condition 	=	{};
	condition.where = 	{};
	condition.where	=	queryData;
	var result	=	{};
	companyAppraisalMasterFormModel.update(set, condition).then(function(editCompanyAppraisalMasterFormRes) {
		if(editCompanyAppraisalMasterFormRes[0] == 0){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	editCompanyAppraisalMasterFormRes;
		}
		return callback(result);
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback(result);
	});
}

function deleteCompanyAppraisalMasterForm(queryData, companyAppraisalMasterFormInput, callback) {
	var set		=	{isDeleted : true};
	var condition 	=	{};
	condition.where = 	{};
	condition.where	=	queryData;
	var result	=	{};
	companyAppraisalMasterFormModel.update(set, condition).then(function(editCompanyAppraisalMasterFormRes) {
		if(editCompanyAppraisalMasterFormRes[0] == 0){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	editCompanyAppraisalMasterFormRes;
		}
		return callback(result);
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback(result);
	});
}

function createAppraisalFinalForm(appraisalFinalFormInput, callback) {
	var appraisalFinalFormDetails =	appraisalFinalFormModel.build(appraisalFinalFormInput);
	var result	=	{};
	appraisalFinalFormDetails.save().then(function(appraisalFinalFormData) {
		if(appraisalFinalFormData == ''){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	appraisalFinalFormData;
		}
		return callback(result);
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback(result);
	});
}

function getAppraisalFinalForm(appraisalFinalFormInput, callback) {
	var condition = {};
	condition.where = 	{};
	condition.where	=	appraisalFinalFormInput;
	var result	=	{};
	appraisalFinalFormModel.findAll({
		where : {
			isDeleted : false
		}
	}).then(function(appraisalFinalFormData) {
		if(appraisalFinalFormData == ''){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	appraisalFinalFormData;
		}
		return callback(result);
	}).catch(function(err){
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback(result);
	});
}

function editAppraisalFinalForm(queryData, appraisalFinalFormInput, callback) {
	var set		=	appraisalFinalFormInput;
	var condition 	=	{};
	condition.where = 	{};
	condition.where	=	queryData;
	var result	=	{};
	appraisalFinalFormModel.update(set, condition).then(function(editAppraisalFinalFormRes) {
		if(editAppraisalFinalFormRes[0] == 0){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	editAppraisalFinalFormRes;
		}
		return callback(result);
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback( result );
	});
}

function deleteAppraisalFinalForm(queryData, appraisalFinalFormInput, callback) {
	var set		=	{isDeleted : true};
	var condition 	=	{};
	condition.where = 	{};
	condition.where	=	queryData;
	var result	=	{};
	appraisalFinalFormModel.update(set, condition).then(function(editAppraisalFinalFormRes) {
		if(editAppraisalFinalFormRes[0] == 0){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	editAppraisalFinalFormRes;
		}
		return callback(result);
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback(result);
	});
}

function createCompanyAppraisalFinalForm(companyAppraisalFinalFormInput, callback) {
	var companyAppraisalFinalFormDetails =	companyAppraisalFinalFormModel.build(companyAppraisalFinalFormInput);
	var result	=	{};
	companyAppraisalFinalFormDetails.save().then(function(companyAppraisalFinalFormData) {
		if(companyAppraisalFinalFormData == ''){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	companyAppraisalFinalFormData;
		}
		return callback(result);
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback(result);
	});
}

function getCompanyAppraisalFinalForm(companyAppraisalFinalFormInput, callback) {
	var condition = {};
	condition.where = 	{};
	condition.where	=	companyAppraisalFinalFormInput;
	var result	=	{};
	companyAppraisalFinalFormModel.findAll({
		where : {
			isDeleted : false
		}
	}).then(function(companyAppraisalFinalFormData) {
		if(companyAppraisalFinalFormData == ''){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	companyAppraisalFinalFormData;
		}
		return callback(result);
	}).catch(function(err){
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback(result);
	});
}

function editCompanyAppraisalFinalForm(queryData, companyAppraisalFinalFormInput, callback) {
	var set		=	companyAppraisalFinalFormInput;
	var condition 	=	{};
	condition.where = 	{};
	condition.where	=	queryData;
	var result	=	{};
	companyAppraisalFinalFormModel.update(set, condition).then(function(editCompanyAppraisalFinalFormRes) {
		if(editCompanyAppraisalFinalFormRes[0] == 0){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	editCompanyAppraisalFinalFormRes;
		}
		return callback(result);
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback(result);
	});
}

function deleteCompanyAppraisalFinalForm(queryData, companyAppraisalFinalFormInput, callback) {
	var set		=	{isDeleted : true};
	var condition 	=	{};
	condition.where = 	{};
	condition.where	=	queryData;
	var result	=	{};
	companyAppraisalFinalFormModel.update(set, condition).then(function(editCompanyAppraisalFinalFormRes) {
		if(editCompanyAppraisalFinalFormRes[0] == 0){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	editCompanyAppraisalFinalFormRes;
		}
		return callback(result);
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback(result);
	});
}

function formAppraisalData(userAppraisalFormInput, callback) {
	console.log("FORM_APPRAISAL_DATA; " + JSON.stringify(userAppraisalFormInput));
	var userAppraisalInput = userAppraisalFormInput;
	var appraisalData = userAppraisalFormInput.appraisalData;
	var recommendation = userAppraisalFormInput.recommendation;
	var appraiseeId = userAppraisalFormInput.appraise;
	var appraisalCreatedById = userAppraisalFormInput.createdBy;
	var companyId = userAppraisalFormInput.companyId;

	
	console.log(JSON.parse(appraisalData));
	console.log(JSON.parse(recommendation));
	var result = {};
	var parsedAppraisalData = JSON.parse(appraisalData);
	var parsedRecommendationData = JSON.parse(recommendation);
	var i = 0;
	var userAppraisalInputArr = [];
	var uid = uuid.v1();
	var userAppraisalInputUuid = {};
	
	if(userAppraisalFormInput.recordType == 'newRecord') {
		userAppraisalInputUuid.uuid = uid;
		userAppraisalInputUuid.recordType = 'newRecord';
	}else if(userAppraisalFormInput.recordType == 'updatedRecord') {
		userAppraisalInputUuid.recordType = 'updatedRecord';
		userAppraisalInputUuid.uuid = userAppraisalFormInput.appraisalUid;
	} else {
		userAppraisalInputUuid.uuid = null;
		userAppraisalInputUuid.recordType = 'noRecordTypeInfoFound';
	}

	userAppraisalInputArr.push(userAppraisalInputUuid);
	async.eachSeries(parsedAppraisalData, function(userAppraisalFormData, asynccallback) {
		console.log(Object.keys(parsedAppraisalData)[i] + " ===> " + JSON.stringify(userAppraisalFormData));
		console.log("userAppraisalFormData[value] : " + Object.keys(userAppraisalFormData));
		
		for (var key in userAppraisalFormData) {
			if (userAppraisalFormData.hasOwnProperty(key)) {
				var value = userAppraisalFormData[key];
				var userAppraisalInput = {};
				
				if(userAppraisalFormInput.recordType == 'newRecord') {
					userAppraisalInput.appraisalUid = uid;
				}else if(userAppraisalFormInput.recordType == 'updatedRecord') {
					userAppraisalInput.appraisalUid = userAppraisalFormInput.appraisalUid;
				} else {
					userAppraisalInputUuid.recordType = 'noRecordTypeInfoFound';
				}
				userAppraisalInput.formValues = value;
				userAppraisalInput.valueId = key;
				userAppraisalInput.appraisalId = Object.keys(parsedAppraisalData)[i];
				userAppraisalInput.appraisalCreatedById = appraisalCreatedById;
				userAppraisalInput.appraiseeId = appraiseeId;
				userAppraisalInput.companyId = companyId;	
				userAppraisalInput.categoryId = 1;
				userAppraisalInputArr.push(userAppraisalInput);
			}
		}
		console.log("userAppraisalInputArr : " + JSON.stringify(userAppraisalInputArr));		
		i++;
		return asynccallback();
	}, function() {
		result.message	=	userAppraisalInputArr;
        return callback(result);
    });
}

function formRecommendationData(formUserAppraisalDataInput,hardCodedRequest, callback) {
	console.log("FORM_RECOMMENDATION_DATA : " + JSON.stringify(formUserAppraisalDataInput));
	var userAppraisalInput = formUserAppraisalDataInput;
	var recommendation = hardCodedRequest.recommendation;

	var result = {};
	var parsedRecommendationData = JSON.parse(recommendation);
	
	console.log("parsedRecommendationData : " + JSON.stringify(parsedRecommendationData));
	console.log("formUserAppraisalDataInput : " + JSON.stringify(formUserAppraisalDataInput.message[0]));
	
	
	var i = 0;
	var userRecommendationInputArr = [];

	async.eachSeries(parsedRecommendationData, function(userRecommendationFormData, asynccallback) {
		console.log(Object.keys(parsedRecommendationData)[i] + " ===> " + JSON.stringify(userRecommendationFormData));
		var userRecommendationInput = {};
		userRecommendationInput.appraisalUid = formUserAppraisalDataInput.message[0].uuid;
		var mDFeedBack = '';
		if(userRecommendationFormData.managingDirectorFeedback == 'yes') {
			mDFeedBack = 1;
		} else if(userRecommendationFormData.managingDirectorFeedback == 'no') {
			mDFeedBack = 0;
		} else {
			mDFeedBack = null;
		}
		var rMFeedBack = '';
		if(userRecommendationFormData.reportingManagerFeedback == 'yes') {
			rMFeedBack = 1;
		} else if(userRecommendationFormData.reportingManagerFeedback == 'no') {
			rMFeedBack = 0;
		} else {
			rMFeedBack = null;
		}
		userRecommendationInput.managingDirectorFeedback = mDFeedBack;
		userRecommendationInput.commentByManagingDirector = userRecommendationFormData.commentByManagingDirector;
		userRecommendationInput.reportingManagerFeedback = rMFeedBack;
		userRecommendationInput.commentByReportingManager = userRecommendationFormData.commentByReportingManager;
		userRecommendationInput.typeActionId = Object.keys(parsedRecommendationData)[i];
		userRecommendationInput.appraisalCreatedById = hardCodedRequest.createdBy;
		userRecommendationInput.appraiseeId = hardCodedRequest.appraise;
		userRecommendationInput.companyId = hardCodedRequest.companyId;
		userRecommendationInputArr.push(userRecommendationInput);
	
		i++;
		return asynccallback();
	}, function() {
		result.message	=	userRecommendationInputArr;
		console.log("userRecommendationInputArr: " + JSON.stringify(userRecommendationInputArr));
        return callback(result);
    });
}

function insertAppraisalData(userAppraisalFormInput, callback) {
	console.log("INSERT_APPRAISAL_DATA : " + JSON.stringify(userAppraisalFormInput));
	var result	=	{};
	var resultType = userAppraisalFormInput[0].message[0].recordType;
	var updatedUid = userAppraisalFormInput[0].message[0].uuid;
	console.log(userAppraisalFormInput.length);
	var uid = userAppraisalFormInput[0].message[0].uuid;
	result.uid = uid;
	var count = 0;
	async.eachSeries(userAppraisalFormInput, function(userAppraisalFormData, asynccallback) {
		if(count == 0) {
			userAppraisalFormInput[0].message.splice(0,1);
			async.eachSeries(userAppraisalFormInput[0].message, function(userAppraisalFormInputData, asynccallbackAppraisalForm) {
				console.log("!!!!!!!!!!!!!!!!!!+++++> " + JSON.stringify(userAppraisalFormInputData));
				var userAppraisalDataRows = userAppraisalModel.build(userAppraisalFormInputData);
				if(resultType == 'newRecord') {
					console.log("REQUEST TO INSERT NEW APPRAISAL RECORD.");
					userAppraisalDataRows.save().then(function(userAppraisalDataRes) {
						if(userAppraisalDataRes == ''){
							result.status	=	config.status.ERROR;
							result.message	=	config.status.NoResult;
						} else {
							result.status	=	config.status.SUCCESS;
							result.message	=	userAppraisalDataRes;
						}
					});
				} else if(resultType =='updatedRecord') {
					console.log("REQUEST TO UPDATE EXISTING APPRAISAL RECORD." + updatedUid);
					var queryData = {where :{isDeleted : false, appraisalUid : updatedUid, appraisalId : userAppraisalFormInputData.appraisalId, valueId : userAppraisalFormInputData.valueId, appraiseeId : userAppraisalFormInputData.appraiseeId} };
					userAppraisalModel.update(userAppraisalFormInputData, queryData).then(function(userUpdatedAppraisalDataRes) {
						console.log("USER_APPRAISAL_DATA UPDATED SUCCESSFULLY: " + JSON.stringify(userUpdatedAppraisalDataRes));
			        });
				}
				return asynccallbackAppraisalForm();
			});
			count++;
			return asynccallback();
		} else if(count == 1) {
			async.eachSeries(userAppraisalFormInput[1].message, function(userRecommendationFormInputData, asynccallbackAppraisalForm) {
				var userRecommendationDataRows = companyAppraisalFinalFormModel.build(userRecommendationFormInputData);
				if(recordType = 'newRecord') {
					userRecommendationDataRows.save().then(function(userRecommendationDataRes) {
						if(userRecommendationDataRes == ''){
							result.status	=	config.status.ERROR;
							result.message	=	config.status.NoResult;
						} else {
							result.status	=	config.status.SUCCESS;
							result.message	=	userRecommendationDataRes;
						}
					});
				} else if(recordType = 'updatedRecord') {
					var queryData = {where :{isDeleted : false, appraisalUid : updatedUid} };
					companyAppraisalFinalFormModel.update(userRecommendationFormInputData, queryData).then(function(userUpdatedAppraisalDataRes) {
						console.log("USER_APPRAISAL_DATA [ RECOMMENDATION ] UPDATED SUCCESSFULLY: " + JSON.stringify(userUpdatedAppraisalDataRes));
			        });
				}
				return asynccallbackAppraisalForm();
			});
			count++;
			return asynccallback();
		}
	}, function() {
        return callback(result);
    });
}

function insertUserAppraisalReference(insertUserAppraisalData, callback) {
	var result	=	{};
	console.log("INSERT_USER_APPRAISAL_REFERENCE: " + JSON.stringify(insertUserAppraisalData));
	var userAppraisalReferenceDataRows = userAppraisalReferenceModel.build(insertUserAppraisalData);
	userAppraisalReferenceDataRows.save().then(function(userAppraisalReferenceDataRes){
		if(userAppraisalReferenceDataRes == ''){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.AppraisalCreatedSuccessfully;
			result.message	=	userAppraisalReferenceDataRes;
		}
		return callback(result);
	});
}

function getAllUserAppraisalReference(userAppraisalRefInput, callback) {
	var condition = {};
	condition.where = 	{};
	condition.where	=	userAppraisalRefInput;
	var result	=	{};
	userAppraisalReferenceModel.findAll({
		where : {
			isDeleted : false
		}
	}).then(function(userAppraisalRefData) {
		if(userAppraisalRefData == ''){
			result.status	=	config.status.ERROR;
			result.message	=	config.status.NoResult;
		} else {
			result.status	=	config.status.SUCCESS;
			result.message	=	userAppraisalRefData;
		}
		return callback(result);
	}).catch(function(err){
		console.log("ERROR:",err.message);
		result.status	=	config.status.ERROR;
		result.message	=	err.message;
		return callback(result);
	});
}

function getUserAppraisalDetailsByUid(userAppraisalDetailsInput, callback) {
	var condition = {};
	condition.where = 	{};
	condition.where	=	userAppraisalDetailsInput;
	var appraisalData = {};
	userAppraisalReferenceModel.find({
		where : {
			isDeleted : false,
			appraisalUid : userAppraisalDetailsInput.appraisalUuid
		}
		, include : [{
            model: userModel,
            attributes: ['userName'],as: 'createdBy'
        },{
            model: userModel,
            attributes: ['userName'],as: 'appraisee'
        }]
	}).then(function(userAppraisalRefData) {		
		appraisalData.appraisalName = userAppraisalRefData.appraisalName;
		appraisalData.appraisalStatus = userAppraisalRefData.appraisalStatus;
		appraisalData.appraise = userAppraisalRefData.appraiseeId;
		appraisalData.companyId = userAppraisalRefData.companyId;
		appraisalData.appraisalCreatedById = userAppraisalRefData.appraisalCreatedById;
		appraisalData.appraisalData = {};

		  sequelize.query('SELECT DISTINCT appraisalId FROM user_appraisal where  appraisalUid = ?', {
              replacements: [userAppraisalRefData.appraisalUid],
              type: sequelize.QueryTypes.SELECT
          }).then(function(appraisalUid)  {
        	  	async.eachSeries(appraisalUid, function(appraisalUidEachData, asynccallback) {
	  				userAppraisalModel.findAll({
			  			where : {
			  				isDeleted : false,
			  				appraisalId : appraisalUidEachData.appraisalId
			  			}
			  		}).then(function(userAppraisalData) {
			  			var key = userAppraisalData.id;
			  			appraisalData.appraisalData[appraisalUidEachData.appraisalId] = {};
			  			for(var a = 0; a < userAppraisalData.length; a++) {
			  				appraisalData.appraisalData[appraisalUidEachData.appraisalId][userAppraisalData[a].valueId]=userAppraisalData[a].formValues;
			  			}
			  			asynccallback();
			  		}).catch(function(err) {
			  			console.log("ERROR:",err.message);
			  			asynccallback();
			  		});
	  			});
          });
		  
		  appraisalData.recommendation = {};
		  sequelize.query('SELECT DISTINCT typeActionId FROM company_appraisal_final_form where  appraisalUid = ?', {
              replacements: [userAppraisalRefData.appraisalUid],
              type: sequelize.QueryTypes.SELECT
          }).then(function(typeActionId)  {
        	  console.log("APPRAISAL UUUUUUUUUID : " + JSON.stringify(typeActionId));
        	  	async.eachSeries(typeActionId, function(typeActionIdEachData, asynccallbackRecommendation) {
        	  		companyAppraisalFinalFormModel.find({
			  			where : {
			  				isDeleted : false,
			  				typeActionId : typeActionIdEachData.typeActionId,
			  				appraisalUid : userAppraisalRefData.appraisalUid
			  			}
			  		}).then(function(userRecommendationData) {
			  			console.log("userRecommendationData : " + JSON.stringify(userRecommendationData));
			  			appraisalData.recommendation[typeActionIdEachData.typeActionId] = {};
			  			appraisalData.recommendation[typeActionIdEachData.typeActionId]['managingDirectorFeedback']=userRecommendationData.managingDirectorFeedback;
			  			appraisalData.recommendation[typeActionIdEachData.typeActionId]['commentByManagingDirector']=userRecommendationData.commentByManagingDirector;
			  			appraisalData.recommendation[typeActionIdEachData.typeActionId]['reportingManagerFeedback']=userRecommendationData.reportingManagerFeedback;
			  			appraisalData.recommendation[typeActionIdEachData.typeActionId]['commentByReportingManager']=userRecommendationData.commentByReportingManager;
			  			asynccallbackRecommendation();
			  		}).catch(function(err) {
			  			console.log("ERROR:",err.message);
			  			asynccallbackRecommendation();
			  		});
	  			}, function() {
	  				console.log(" ENTIRE RETRIVAL DATA : " + JSON.stringify(appraisalData));
	  		        return callback(appraisalData);
	  		    });
          });
		  
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		return callback(appraisalData);
	});
}

function updateAppraisalDetailsByUid(updateAppraisalDetailsByUidInput, callback) {
	console.log("UPDATE_APPRAISAL_DETAILS_BY_UID : " + JSON.stringify(updateAppraisalDetailsByUidInput));
	userAppraisalReferenceModel.find({
		where : {
			isDeleted : false,
			appraisalUid : updateAppraisalDetailsByUidInput.appraisalUid
		}
	}).then(function(userAppraisalRefData) {		
		if(userAppraisalRefData != '' && userAppraisalRefData != null) {
			console.log("USER_APPRAISAL_REF_DATA FOUND IN DATABASE : " + JSON.stringify(userAppraisalRefData));
			
			
		} else {
			console.log("USER_APPRAISAL_REF_DATA_NOT_FOUND IN DATABASE : " + JSON.stringify(userAppraisalRefData));
		}
		
		
	}).catch(function(err) {
		console.log("ERROR:",err.message);
		return callback(appraisalData);
	});
	
}

function formUpdateAppraisalData(userAppraisalFormInput, callback) {
	console.log("FORM_UPDATE_APPRAISAL_DATA; " + JSON.stringify(userAppraisalFormInput));
	var userAppraisalInput = userAppraisalFormInput;
	var appraisalData = userAppraisalFormInput.appraisalData;
	var recommendation = userAppraisalFormInput.recommendation;
	var appraiseeId = userAppraisalFormInput.appraise;
	var appraisalCreatedById = userAppraisalFormInput.createdBy;
	var companyId = userAppraisalFormInput.companyId;
	
	console.log(JSON.parse(appraisalData));
	console.log(JSON.parse(recommendation));
	var result = {};
	var parsedAppraisalData = JSON.parse(appraisalData);
	var parsedRecommendationData = JSON.parse(recommendation);
	var i = 0;
	var userAppraisalInputArr = [];
	var uid = uuid.v1();
	var userAppraisalInputUuid = {};
	userAppraisalInputUuid.uuid = uid;
	userAppraisalInputArr.push(userAppraisalInputUuid);
	async.eachSeries(parsedAppraisalData, function(userAppraisalFormData, asynccallback) {
		console.log(Object.keys(parsedAppraisalData)[i] + " ===> " + JSON.stringify(userAppraisalFormData));
		console.log("userAppraisalFormData[value] : " + Object.keys(userAppraisalFormData));
		
		for (var key in userAppraisalFormData) {
			if (userAppraisalFormData.hasOwnProperty(key)) {
				var value = userAppraisalFormData[key];
				var userAppraisalInput = {};
				userAppraisalInput.appraisalUid = uid;
				userAppraisalInput.formValues = value;
				userAppraisalInput.valueId = key;
				userAppraisalInput.appraisalId = Object.keys(parsedAppraisalData)[i];
				userAppraisalInput.appraisalCreatedById = appraisalCreatedById;
				userAppraisalInput.appraiseeId = appraiseeId;
				userAppraisalInput.companyId = companyId;	
				userAppraisalInput.categoryId = 1;
				userAppraisalInputArr.push(userAppraisalInput);
			}
		}
		console.log("formUpdateAppraisalData[userAppraisalInputArr] : " + JSON.stringify(userAppraisalInputArr));		
		i++;
		return asynccallback();
	}, function() {
		result.message	=	userAppraisalInputArr;
        return callback(result);
    });
}

function formUpdateRecommendationData(formUserAppraisalDataInput,hardCodedRequest, callback) {
	console.log("FORM_UPDATE_RECOMMENDATION_DATA : " + JSON.stringify(formUserAppraisalDataInput));
	var userAppraisalInput = formUserAppraisalDataInput;
	var recommendation = hardCodedRequest.recommendation;

	var result = {};
	var parsedRecommendationData = JSON.parse(recommendation);
	
	console.log("parsedRecommendationData : " + JSON.stringify(parsedRecommendationData));
	console.log("formUserAppraisalDataInput : " + JSON.stringify(formUserAppraisalDataInput.message[0]));
	
	
	var i = 0;
	var userRecommendationInputArr = [];

	async.eachSeries(parsedRecommendationData, function(userRecommendationFormData, asynccallback) {
		console.log(Object.keys(parsedRecommendationData)[i] + " ===> " + JSON.stringify(userRecommendationFormData));
		var userRecommendationInput = {};
		userRecommendationInput.appraisalUid = formUserAppraisalDataInput.message[0].uuid;
		var mDFeedBack = '';
		if(userRecommendationFormData.managingDirectorFeedback == 'yes') {
			mDFeedBack = 1;
		} else if(userRecommendationFormData.managingDirectorFeedback == 'no') {
			mDFeedBack = 0;
		} else {
			mDFeedBack = null;
		}
		var rMFeedBack = '';
		if(userRecommendationFormData.reportingManagerFeedback == 'yes') {
			rMFeedBack = 1;
		} else if(userRecommendationFormData.reportingManagerFeedback == 'no') {
			rMFeedBack = 0;
		} else {
			rMFeedBack = null;
		}
		userRecommendationInput.managingDirectorFeedback = mDFeedBack;
		userRecommendationInput.commentByManagingDirector = userRecommendationFormData.commentByManagingDirector;
		userRecommendationInput.reportingManagerFeedback = rMFeedBack;
		userRecommendationInput.commentByReportingManager = userRecommendationFormData.commentByReportingManager;
		userRecommendationInput.typeActionId = Object.keys(parsedRecommendationData)[i];
		userRecommendationInput.appraisalCreatedById = hardCodedRequest.createdBy;
		userRecommendationInput.appraiseeId = hardCodedRequest.appraise;
		userRecommendationInput.companyId = hardCodedRequest.companyId;
		userRecommendationInputArr.push(userRecommendationInput);
	
		i++;
		return asynccallback();
	}, function() {
		result.message	=	userRecommendationInputArr;
		console.log("userRecommendationInputArr: " + JSON.stringify(userRecommendationInputArr));
        return callback(result);
    });
}

module.exports = {
		createAppraisalMasterForm 			: 	createAppraisalMasterForm,
		getAppraisalMasterForm				: 	getAppraisalMasterForm,
		editAppraisalMasterForm				: 	editAppraisalMasterForm,
		deleteAppraisalMasterForm			: 	deleteAppraisalMasterForm,
		
		createAppraisalFinalForm			: 	createAppraisalFinalForm,
		getAppraisalFinalForm				: 	getAppraisalFinalForm,
		editAppraisalFinalForm				: 	editAppraisalFinalForm,
		deleteAppraisalFinalForm			:	deleteAppraisalFinalForm,
		
		createCompanyAppraisalFinalForm		: 	createCompanyAppraisalFinalForm,
		getCompanyAppraisalFinalForm		: 	getCompanyAppraisalFinalForm,
		editCompanyAppraisalFinalForm		: 	editCompanyAppraisalFinalForm,
		deleteCompanyAppraisalFinalForm		: 	deleteCompanyAppraisalFinalForm,
		
		createCompanyAppraisalMasterForm	:	createCompanyAppraisalMasterForm,
		getCompanyAppraisalMasterForm		:	getCompanyAppraisalMasterForm,
		editCompanyAppraisalMasterForm		:	editCompanyAppraisalMasterForm,
		deleteCompanyAppraisalMasterForm	:	deleteCompanyAppraisalMasterForm,
		
		formAppraisalData					: 	formAppraisalData,
		formRecommendationData				:	formRecommendationData,
		insertAppraisalData					:	insertAppraisalData,
		insertUserAppraisalReference		:	insertUserAppraisalReference,
		getAllUserAppraisalReference		:	getAllUserAppraisalReference,
		getUserAppraisalDetailsByUid		:	getUserAppraisalDetailsByUid,
		updateAppraisalDetailsByUid			:	updateAppraisalDetailsByUid,
		formUpdateAppraisalData				:	formUpdateAppraisalData,
		formUpdateRecommendationData		:	formUpdateRecommendationData
		
};
