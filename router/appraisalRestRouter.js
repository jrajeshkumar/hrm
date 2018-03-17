/**
 * Manages appraisal based rest services.
 */

var appraisalManager = require('./../modules/appraisal/appraisalManager');
var lodash = require('lodash');

function APPRAISAL_REST_ROUTER(router) {
	var self = this;
	self.handleRoutes(router);
}

APPRAISAL_REST_ROUTER.prototype.handleRoutes = function(router) {
	var self = this;
	
	router.post("/appraisal/createAppraisalMasterForm", function(req, res) {
		appraisalManager.createAppraisalMasterForm(req.body, function(createAppraisalMasterFormRes) {
			res.send(createAppraisalMasterFormRes);
		});
	});

	router.get("/appraisal/getAppraisalMasterForm", function(req, res) {
		appraisalManager.getAppraisalMasterForm(req.body, function(getAppraisalMasterFormRes){
			res.send(getAppraisalMasterFormRes);
		});
	});

	router.put("/appraisal/editAppraisalMasterForm/:id", function(req, res) {
		appraisalManager.editAppraisalMasterForm(req.params, req.body, function(editAppraisalMasterFormRes){
			res.send(editAppraisalMasterFormRes);
		});
	});
	
	router.delete("/appraisal/deleteAppraisalMasterForm/:id", function(req, res) {
		appraisalManager.deleteAppraisalMasterForm(req.params, req.body, function(deleteAppraisalMasterFormRes){
			res.send(deleteAppraisalMasterFormRes);
		});
	});
	
	router.post("/appraisal/createCompanyAppraisalMasterForm", function(req, res) {
		console.log("createCompanyAppraisalMasterForm : " + JSON.stringify(req.body));
		appraisalManager.createCompanyAppraisalMasterForm(req.body, function(createCompanyAppraisalMasterFormRes) {
			res.send(createCompanyAppraisalMasterFormRes);
		});
	});

	router.post("/appraisal/getCompanyAppraisalMasterForm", function(req, res) {
		appraisalManager.getCompanyAppraisalMasterForm(req.body, function(getCompanyAppraisalMasterFormRes){
			res.send(getCompanyAppraisalMasterFormRes);
		});
	});

	router.put("/appraisal/editCompanyAppraisalMasterForm/:id", function(req, res) {
		appraisalManager.editCompanyAppraisalMasterForm(req.params, req.body, function(editCompanyAppraisalMasterFormRes){
			res.send(editCompanyAppraisalMasterFormRes);
		});
	});
	
	router.delete("/appraisal/deleteCompanyAppraisalMasterForm/:id", function(req, res) {
		appraisalManager.deleteCompanyAppraisalMasterForm(req.params, req.body, function(deleteCompanyAppraisalMasterFormRes){
			res.send(deleteCompanyAppraisalMasterFormRes);
		});
	});
	
	router.post("/appraisal/createAppraisalFinalForm", function(req, res) {
		appraisalManager.createAppraisalFinalForm(req.body, function(createAppraisalFinalFormRes){
			res.send(createAppraisalFinalFormRes);
		});
	});

	router.get("/appraisal/getAppraisalFinalForm", function(req, res) {
		appraisalManager.getAppraisalFinalForm(req.body, function(getAppraisalFinalFormRes){
			res.send(getAppraisalFinalFormRes);
		});
	});

	router.put("/appraisal/editAppraisalFinalForm/:id", function(req, res) {
		appraisalManager.editAppraisalFinalForm(req.params, req.body, function(editAppraisalFinalFormRes){
			res.send(editAppraisalFinalFormRes);
		});
	});
	
	router.delete("/appraisal/deleteAppraisalFinalForm/:id", function(req, res) {
		appraisalManager.deleteAppraisalFinalForm(req.params, req.body, function(deleteAppraisalFinalFormRes){
			res.send(deleteAppraisalFinalFormRes);
		});
	});
	
	router.post("/appraisal/createCompanyAppraisalFinalForm", function(req, res) {
		console.log("createCompanyAppraisalFinalForm ===> " + JSON.stringify(req.body));
		appraisalManager.createCompanyAppraisalFinalForm(req.body, function(createCompanyAppraisalFinalFormRes){
			res.send(createCompanyAppraisalFinalFormRes);
		});
	});

	router.get("/appraisal/getCompanyAppraisalFinalForm", function(req, res) {
		appraisalManager.getCompanyAppraisalFinalForm(req.body, function(getCompanyAppraisalFinalFormRes){
			res.send(getCompanyAppraisalFinalFormRes);
		});
	});

	router.put("/appraisal/editCompanyAppraisalFinalForm/:id", function(req, res) {
		appraisalManager.editCompanyAppraisalFinalForm(req.params, req.body, function(editCompanyAppraisalFinalFormRes){
			res.send(editCompanyAppraisalFinalFormRes);
		});
	});
	
	router.delete("/appraisal/deleteCompanyAppraisalFinalForm/:id", function(req, res) {
		appraisalManager.deleteCompanyAppraisalFinalForm(req.params, req.body, function(deleteCompanyAppraisalFinalFormRes){
			res.send(deleteCompanyAppraisalFinalFormRes);
		});
	});
	
	router.get("/appraisal/getAllUserAppraisalReference", function(req, res) {
		appraisalManager.getAllUserAppraisalReference(req.body, function(getAllUserAppraisalReferenceRes){
			res.send(getAllUserAppraisalReferenceRes);
		});
	});
	
	router.post("/appraisal/getUserAppraisalDetailsByUid", function(req, res) {
		appraisalManager.getUserAppraisalDetailsByUid(req.body, function(getUserAppraisalDetailsByUidRes){
			res.send(getUserAppraisalDetailsByUidRes);
		});
	});
	
	/* router.post("/appraisal/updateAppraisalDetailsByUid", function(req, res) {
		console.log("req: " + JSON.stringify(req.body));
		var updateAppraisalData = [];
		var resultDetailsForRef = {};
		
		var hardCodedRequest = { "appraisalUid" : "09c25350-8b9f-11e6-aa02-a1090843293b","appraisalName" : "YearEndAppraisal","appraise": "14", "appraisalData": "{\"1\":{\"2\":\"STRENGTH1\",\"3\":\"IMPROVEMENT1\",\"4\":\"ACHIEVEMENT1\"},\"5\":{\"6\":\"FEEDBACK1\"},\"7\":{\"8\":\"NEEDS1\"},\"686\":{\"688\":\"Good\",\"694\":\"Good\",\"700\":\"Good\",\"705\":\"Good\"}}", "recommendation": "{\"1\":{\"managingDirectorFeedback\":\"no\",\"commentByManagingDirector\":\"Comments1\"},\"2\":{\"managingDirectorFeedback\":\"no\",\"commentByManagingDirector\":\"Comments1\"},\"3\":{\"managingDirectorFeedback\":\"no\",\"commentByManagingDirector\":\"Comments1\"},\"4\":{\"managingDirectorFeedback\":\"no\",\"commentByManagingDirector\":\"Comments1\"},\"5\":{\"managingDirectorFeedback\":\"no\",\"commentByManagingDirector\":\"Comments1\"}}", "companyId": "1000", "createdBy": "7" };
			
		appraisalManager.formUpdateAppraisalData(hardCodedRequest, function(formUserUpdateAppraisalDataRes) {
			resultDetailsForRef.appraisalUid = formUserUpdateAppraisalDataRes.message[0].uuid;
			resultDetailsForRef.appraisalCreatedById = formUserUpdateAppraisalDataRes.message[1].appraisalCreatedById;
			resultDetailsForRef.appraiseeId = formUserUpdateAppraisalDataRes.message[1].appraiseeId;
			resultDetailsForRef.companyId = formUserUpdateAppraisalDataRes.message[1].companyId;
			resultDetailsForRef.categoryId = formUserUpdateAppraisalDataRes.message[1].categoryId;
			updateAppraisalData.push(formUserUpdateAppraisalDataRes);
			
			appraisalManager.formUpdateRecommendationData(formUserUpdateAppraisalDataRes,hardCodedRequest, function(formRecommendationDataRes) {
				updateAppraisalData.push(formRecommendationDataRes);
				appraisalManager.insertUpdateAppraisalData(updateAppraisalData, function(insertUserUpdateAppraisalDataRes) {
					appraisalManager.insertUserAppraisalReference(resultDetailsForRef, function(insertUserAppraisalReferenceDataRes) {
						res.send(insertUserAppraisalReferenceDataRes);
					});	
				});				
			});
		});
	}); */
	
	router.post("/appraisal/saveUserAppraisalData", function(req, res) {
		console.log("req: " + JSON.stringify(req.body));
		var appraisalData = [];
		var resultDetailsForRef = {};
		//var hardCodedRequest = { "recordType": "newRecord", "appraisalUid": "09c25350-8b9f-11e6-aa02-a1090843293b", "appraisalName": "YearEndAppraisal", "appraise": "14", "appraisalData": "{\"1\":{\"2\":\"STRENGTH_NEW\",\"3\":\"IMPROVEMENT_NEW\",\"4\":\"ACHIEVEMENT_NEW\"},\"5\":{\"6\":\"FEEDBACK_NEW\"},\"7\":{\"8\":\"NEEDS_NEW\"},\"686\":{\"688\":\"Good\",\"694\":\"Good\",\"700\":\"Good\",\"705\":\"Good\"}}", "recommendation": "{\"1\":{\"managingDirectorFeedback\":\"yes\",\"commentByManagingDirector\":\"Comments_NEW\"},\"2\":{\"managingDirectorFeedback\":\"yes\",\"commentByManagingDirector\":\"Comments_NEW\"},\"3\":{\"managingDirectorFeedback\":\"no\",\"commentByManagingDirector\":\"Comments_NEW\"},\"4\":{\"managingDirectorFeedback\":\"no\",\"commentByManagingDirector\":\"Comments_NEW\"},\"5\":{\"managingDirectorFeedback\":\"no\",\"commentByManagingDirector\":\"Comments_NEW\"}}", "companyId": "1000", "createdBy": "7" };
		var hardCodedRequest = { "recordType": "updatedRecord", "appraisalUid": "041627e0-8bd3-11e6-a35e-0bd5b4174442", "appraisalName": "YearEndAppraisal", "appraise": "14", "appraisalData": "{\"1\":{\"2\":\"STRENGTH_UPDATE\",\"3\":\"IMPROVEMENT_UPDATE\",\"4\":\"ACHIEVEMENT_UPDATE\"},\"5\":{\"6\":\"FEEDBACK_UPDATE\"},\"7\":{\"8\":\"NEEDS_UPDATE\"},\"686\":{\"688\":\"Good\",\"694\":\"Good\",\"700\":\"Good\",\"705\":\"Good\"}}", "recommendation": "{\"1\":{\"managingDirectorFeedback\":\"no\",\"commentByManagingDirector\":\"Comment_UPDATE\"},\"2\":{\"managingDirectorFeedback\":\"no\",\"commentByManagingDirector\":\"Comments_UPDATE\"},\"3\":{\"managingDirectorFeedback\":\"no\",\"commentByManagingDirector\":\"Comments_UPDATE\"},\"4\":{\"managingDirectorFeedback\":\"no\",\"commentByManagingDirector\":\"Comments_UPDATE\"},\"5\":{\"managingDirectorFeedback\":\"no\",\"commentByManagingDirector\":\"Comments_UPDATE\"}}", "companyId": "1000", "createdBy": "7" };
		
		//var hardCodedRequest = req.body;
			
		console.log("HARD CODED REQUEST: " + JSON.stringify(hardCodedRequest));
		appraisalManager.formAppraisalData(hardCodedRequest, function(formUserAppraisalDataRes) {
			
			console.log("formUserAppraisalDataRes: " + JSON.stringify(formUserAppraisalDataRes));
			
			resultDetailsForRef.appraisalUid = formUserAppraisalDataRes.message[0].uuid;
			resultDetailsForRef.appraisalCreatedById = formUserAppraisalDataRes.message[1].appraisalCreatedById;
			resultDetailsForRef.appraiseeId = formUserAppraisalDataRes.message[1].appraiseeId;
			resultDetailsForRef.companyId = formUserAppraisalDataRes.message[1].companyId;
			resultDetailsForRef.categoryId = formUserAppraisalDataRes.message[1].categoryId;
			resultDetailsForRef.recordType = formUserAppraisalDataRes.message[0].recordType;			
			appraisalData.push(formUserAppraisalDataRes);
			
			appraisalManager.formRecommendationData(formUserAppraisalDataRes,hardCodedRequest, function(formRecommendationDataRes) {
				appraisalData.push(formRecommendationDataRes);
				appraisalManager.insertAppraisalData(appraisalData, function(insertUserAppraisalDataRes) {
					appraisalManager.insertUserAppraisalReference(resultDetailsForRef, function(insertUserAppraisalReferenceDataRes) {
						console.log("insertUserAppraisalReferenceDataRes: " + JSON.stringify(insertUserAppraisalReferenceDataRes));
						res.send(insertUserAppraisalReferenceDataRes);
					});	
				});				
			});
		});
	});
};

module.exports = APPRAISAL_REST_ROUTER;