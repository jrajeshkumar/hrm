/**
 *  Manages task based rest services.
 */

var taskManager = require('./../modules/task/taskManager');
var taskEvaluationManager = require('./../modules/task/taskEvaluationManager');
var taskEvaluationModel = require('./../db/tableschemamodel/taskEvaluationModel');
var userManager = require('./../modules/user/userManager');
var lodash = require('lodash');
var pushAlert = require('./../service/pushAlert.js');

var config = require('./../config/config.json');
function TASK_REST_ROUTER(router) {
	var self = this;
	self.handleRoutes(router);
}

TASK_REST_ROUTER.prototype.handleRoutes = function(router) {
	var self = this;
		
	/*
	 * Creates a new task.
	 * 
	 */
	
	router.post("/task/createTask", function(req, res) {
		taskManager.createTask(req.body, function(createTaskRes){
			createTaskRes.jobAssignment = req.body.jobAssignment.toString();
			console.log("createTaskRes: " + JSON.stringify(createTaskRes));
			console.log("1===> : " + createTaskRes.jobAssignment);
			var aaa = "[" + createTaskRes.jobAssignment + "]"; 
			createTaskRes.jobAssignment = aaa;
			console.log(createTaskRes.jobAssignment);
			taskManager.createUserTaskEvaluation(createTaskRes, function(userTaskEvaluationRes) {
				res.send(userTaskEvaluationRes);
				pushAlert.sendUserTask(req.app,createTaskRes.message.dataValues);
			});
		});
	});
	

	/*
	 * 
	 * Get all task details.
	 * 
	 */
	router.post("/task/getTaskDetails", function(req, res) {
		taskManager.getTaskDetails(req.body, function(taskRes){
			res.send(taskRes);
		});
	});
	
	/*
	 * Update task details by task id.
	 * 
	 */
	router.put("/task/editTaskDetails/:id", function(req, res) {
		taskManager.editTaskDetails(req.params, req.body, function(taskRes){
	        if (req.body.status == 'completed') {
	        	taskManager.getTaskDetails({taskId:req.params.id}, function(taskRes){
	    	        if (taskRes.status == config.status.SUCCESS ) {
	    	        	console.log(taskRes,'///////////');
					pushAlert.sendCompletedTask(req.app,taskRes.message[0].dataValues);
	    	        }
	    		});
	        }
// console.log(taskRes)
			
			res.send(taskRes);
		});
	});
	
	/*
	 * Delete a task by task id.
	 * 
	 */
	router.post("/task/deleteTask/:taskId", function(req, res) {
		taskManager.editTaskDetails(req.params, req.body, function(taskRes){
			res.send(taskRes);
		});
	});
	
	/* taskEvaluation
	 * Creates a new taskEvaluation.
	 * 
	 */
	router.post("/taskEvaluation/createTask", function(req, res) {
		taskEvaluationManager.createTaskEvaluation(req.body, function(taskRes) {
			var jobAssignmentArray = JSON.parse(req.body.jobAssignment);
			if (taskRes.status == 'Success') {
				for (var i = 0; i < jobAssignmentArray.length; i++) {
					taskRes.message.taskEvaluationId = jobAssignmentArray[i];
					taskManager.createUserTaskEvaluation(taskRes);
				}
			}
			res.send(taskRes);
		});
	});
	
	/*
	 * 
	 * Get all task details.
	 * 
	 */
	router.post("/taskEvaluation/getTaskEvaluationDetails", function(req, res) {
		taskEvaluationManager.getTaskEvaluationDetails(req.body, function(taskRes){
			res.send(taskRes);
		});
	});
	
	/*
	 * Update task details by task id.
	 *
	 */
	router.post("/taskEvaluation/editTaskEvaluationDetails/:id", function(req, res) {
		taskEvaluationManager.editTaskEvaluationDetails(req.params, req.body, function(taskRes){
			res.send(taskRes);
		});
	});
	
	/*
	 * Delete a task by task id.
	 * 
	 */
	router.delete("/taskEvaluation/deleteTaskEvaluationDetails/:taskId", function(req, res) {
		taskEvaluationManager.deleteTaskEvaluationDetails({
			id : req.params.taskId
		},{
			isDeleted : true,
		}, function(taskRes){
			res.send(taskRes);
		});
	});

	/*
	 * Creates a new task.
	 * 
	 */
	router.post("/task/getUserTaskEvaluation", function(req, res) {
		taskManager.getUserTaskEvaluation(req.body, function(userTaskEvaluationRes){
				res.send(userTaskEvaluationRes);
		});
	});
	
	/*
	 * Update task ranking.
	 * 
	 */
	router.post("/task/updateTaskRanking", function(req, res) {
		console.log("updateTaskRanking: " + JSON.stringify(req.body));
		taskManager.updateTaskRanking(req.body, function(updateTaskRankingRes) {
				res.send(updateTaskRankingRes);
		});
	});
	
	/*
	 * Creates a new task.
	 * 
	 */
	
	router.post("/task/getCompletedUserTaskEvaluation/:id", function(req, res) {
		console.log(lodash.assign(req.body, req.params),req.body, req.params);
		taskManager.getCompletedUserTaskEvaluation(lodash.assign(req.body, req.params), function(userTaskEvaluationRes){
				res.send(userTaskEvaluationRes);
		});
	});
	
	/*
	 * Get pagination records by 
	 * page number.
	 */
	
	router.post("/task/getTaskPaginationRecords/:pageNumber", function(req, res) {
		taskManager.getTaskPaginationRecords(lodash.assign(req.body, req.params), function(taskPaginationRecordsRes){
				res.send(taskPaginationRecordsRes);
		});
	});
	


};

module.exports = TASK_REST_ROUTER;