/**
 * taskManager handles all task related database operations.
 * 
 */
var taskModel = require('./../../db/tableschemamodel/taskModel');
var userModel = require('./../../db/tableschemamodel/userModel');
var userTaskEvaluationModel = require('./../../db/tableschemamodel/userTaskEvaluationModel');
var taskEvaluationModel = require('./../../db/tableschemamodel/taskEvaluationModel');
// var userTaskEvaluationModel =
// require('./../../db/tableschemamodel/userTaskEvaluationModel');
var async = require('async');
var config = require('./../../config/config.json');
var utils = require('./../../config/utils');
var Sequelize = require('sequelize');

function createTask(taskInput, callback) {
    var taskDetails = taskModel.build(taskInput);
    var result = {};
    taskDetails.save().then(function(taskData) {
        if (taskData == '') {
            result.status = config.status.ERROR;
            result.message = config.status.NoResult;
        } else {
            result.status = config.status.SUCCESS;
            result.message = taskData;
        }
        return callback(result);
    }).catch(function(err) {
        console.log("ERROR:", err.message);
        result.status = config.status.ERROR;
        result.message = err.message;
        return callback(result);
    });
}

function getTaskDetails(taskInput, callback) {
    var result = {};
    if (taskInput.taskId != null && taskInput.taskId != '') {
        if (taskInput.userId != null && taskInput.userId != '') {
            taskModel.findAll({
                where: {
                    id: taskInput.taskId,
                    userId: taskInput.userId
                }, include: [{
                    model: userModel,
                    attributes: ['userName']
                },{
                    model: userModel,
                    attributes: ['userName'],as: 'created'
                }]
            }).then(function(taskData) {
                if (taskData == '') {
                    result.status = config.status.ERROR;
                    result.message = config.status.NoResult;
                } else {
                    result.status = config.status.SUCCESS;
                    result.message = taskData;
                }
                return callback(result);
            }).catch(function(err) {
                result.status = config.status.ERROR;
                result.message = err.message;
                return callback(result);
            });
        } else {
            taskModel.findAll({
                where: {
                    id: taskInput.taskId
                }, include: [{
                    model: userModel,
                    attributes: ['userName']
                },{
                    model: userModel,
                    attributes: ['userName'],as: 'created'
                }]
            }).then(function(taskData) {
                if (taskData == '') {
                    result.status = config.status.ERROR;
                    result.message = config.status.NoResult;
                } else {
                    result.status = config.status.SUCCESS;
                    result.message = taskData;
                }
                return callback(result);
            }).catch(function(err) {
                result.status = config.status.ERROR;
                result.message = err.message;
                return callback(result);
            });
        }
    } else if (taskInput.taskId == null || taskInput.taskId == '') {
        if (taskInput.userId != null && taskInput.userId != '') {
            taskModel.findAll({
                where: {
                    userId: taskInput.userId
                }, include: [{
                    model: userModel,
                    attributes: ['userName']
                },{
                    model: userModel,
                    attributes: ['userName'],as: 'created'
                }]
            }).then(function(taskData) {
                if (taskData == '') {
                    result.status = config.status.ERROR;
                    result.message = config.status.NoResult;
                } else {
                    result.status = config.status.SUCCESS;
                    result.message = taskData;
                }
                return callback(result);
            }).catch(function(err) {
                console.log("ERROR:", err.message);
                result.status = config.status.ERROR;
                result.message = err.message;
                return callback(result);
            });
        } else {
            taskModel.findAll({
            	include: [{
                    model: userModel,
                    attributes: ['userName']
                },{
                    model: userModel,
                    attributes: ['userName'],as: 'created'
                }]
            }).then(function(taskData) {
                if (taskData == '') {
                    result.status = config.status.ERROR;
                    result.message = config.status.NoResult;
                } else {
                    result.status = config.status.SUCCESS;
                    result.message = taskData;
                }
                return callback(result);
            }).catch(function(err) {
                console.log("ERROR:", err.message);
                result.status = config.status.ERROR;
                result.message = err.message;
                return callback(result);
            });
        }
    }
}

function editTaskDetails(queryData, taskInput, callback) {
    var condition = {};
    condition.where = {};
    condition.where = queryData;
    var result = {};
    taskModel.update(taskInput, condition).then(function(task) {
        if (task[0] == 0) {
            result.status = config.status.ERROR;
            result.message = config.status.NoResult;
        } else {
            result.status = config.status.SUCCESS;
            result.message = task;
        }
        return callback(result);
    }).catch(function(err) {
        console.log("ERROR:", err.message);
        result.status = config.status.ERROR;
        result.message = err.message;
        return callback(result);
    });
}

function deleteTask(queryData, taskInput, callback) {
    var condition = {};
    condition.where = {};
    condition.where = queryData;
    var result = {};
    taskModel.update(taskInput, condition).then(function(item) {
        if (item[0] == 0) {
            result.status = config.status.ERROR;
            result.message = config.status.NoResult;
        } else {
            result.status = config.status.SUCCESS;
            result.message = item;
        }
        return callback(result);
    }).catch(function(err) {
        console.log("ERROR:", err.message);
        result.status = config.status.ERROR;
        result.message = err.message;
        return callback(result);
    });
}

function getWeightageByTaskEvaluationId(taskEvaluationId, callback) {
    var result = {};
    taskEvaluationModel.findOne({
        where: {
            id: taskEvaluationId
        }
    }).then(function(taskEvaluationData) {
        if (taskEvaluationData == '') {
            result.status = config.status.ERROR;
            result.message = config.status.NoResult;
        } else {
            result.message = taskEvaluationData;
            callback(result);
        }
    }).catch(function(err) {
        console.log("ERROR:", err.message);
        result.status = config.status.ERROR;
        result.message = err;
        return result;
    });
}

function createUserTaskEvaluation(userTaskEvaluationInput, callback) {
    var input = {};
    console.log(">>>>>>1 : " + userTaskEvaluationInput.jobAssignment);
    var jobAssignmentArr = JSON.parse(userTaskEvaluationInput.jobAssignment);
    var result = {};
    async.eachSeries(jobAssignmentArr, function(taskEvalId, asynccallback) {
        getWeightageByTaskEvaluationId(taskEvalId, function(taskEvaluation) {
            input.rating = null;
            input.total = null;
            input.userId = userTaskEvaluationInput.message.userId;
            input.taskId = userTaskEvaluationInput.message.id;
            // input.taskEvaluationId =
            // userTaskEvaluationInput.message.taskEvaluationId;
            input.taskEvaluationId = taskEvalId;
            console.log(">>>>>@@@@>>>>>: " + input.taskEvaluationId);
            var userTaskEvaluationDetails = userTaskEvaluationModel.build(input);
            var result = {};
            userTaskEvaluationDetails.save().then(function(userTaskEvaluationData) {
                if (userTaskEvaluationData == '') {
                    console.log("If ");
                    result.status = config.status.ERROR;
                    result.message = config.status.NoResult;
                } else {
                    console.log("Else ");
                    result.status = config.status.SUCCESS;
                    result.message = userTaskEvaluationData;
                }
                return asynccallback();
            }).catch(function(err) {
                console.log("ERROR:", err.message);
                result.status = config.status.ERROR;
                result.message = err.message;
                return asynccallback();
            });
        });
    }, function() {
        result.status = config.status.SUCCESS;
        result.message = config.status.TaskCreationSuccess;
        return callback(result);
    });
}

function getUserTaskEvaluation(userTaskEvaluationInput, callback) {
    var condition = userTaskEvaluationInput;
    var result = {};
    userTaskEvaluationModel.findAll({
        where: condition,
        include: [{
            model: userModel,
            attributes: ['id', 'userName', 'employeeId']
        }, {
            model: taskModel,
            attributes: ['id', 'taskName']
        }]
    }).then(function(userTaskEvaluationData) {
        if (userTaskEvaluationData == '') {
            result.status = config.status.ERROR;
            result.message = config.status.NoResult;
        } else {
            result.status = config.status.SUCCESS;
            result.message = userTaskEvaluationData;
        }
        return callback(result);
    }).catch(function(err) {
        console.log("ERROR:", err.message);
        result.status = config.status.ERROR;
        result.message = err.message;
        return callback(result);
    });
}

function getCompletedUserTaskEvaluation(userTaskEvaluationInput, callback) {
	console.log('///////////',userTaskEvaluationInput);
    var condition = {};
    userTaskEvaluationInput.id ? condition.id = userTaskEvaluationInput.id : '';
    var result = {};
    // taskModel.belongsTo(userTaskEvaluationModel);
    userModel.find({
        where: condition
    }).then(function(userTaskEvaluationData) {
        if (userTaskEvaluationData) {
            condition = {};
            condition.userId = userTaskEvaluationInput.id;
            userTaskEvaluationInput.taskId ? condition.id = userTaskEvaluationInput.taskId : '';
            taskModel.findAll({
                where: condition,
                include: [{
                    model: userTaskEvaluationModel,
                    as: 'userTaskEvaluation',
                    // through: {
                    where: {
                        taskId: Sequelize.col('tasks.id'),
                        userId: userTaskEvaluationInput.id
                            // }
                    },
                    include: [{
                        model: taskEvaluationModel,
                        attributes: ['name', 'description'],
                        as: 'taskEvaluation'
                    }]
                }]
            }).then(function(userTaskData) {
                if (userTaskData) {
                    result.status = config.status.SUCCESS;
                    result.Message = {
                        user: userTaskEvaluationData,
                        userTaskData: userTaskData
                    };
                } else {
                    result.status = config.status.ERROR;
                    result.Message = err.message;
                }
                return callback(result);
            }).catch(function(err) {
                console.log("ERROR:", err.message);
                result.status = config.status.ERROR;
                result.Message = err.message;
                return callback(result);
                // condition ={};
                // userTaskEvaluationModel.findAll({
                // where:condition
                // }).then(function(userTaskEvaluationData) {
                // if(userData == '') {
                // result.status = config.status.ERROR;
                // result.Message = config.status.NoResult;
                // } else {
                // result.status = config.status.SUCCESS;
                // result.Message = userTaskEvaluationData;
                // }
                // return callback( result );
                // }).catch(function(err){
                // console.log("ERROR:",err.message);
                // result.status = config.status.ERROR;
                // result.Message = err.message;
                // return callback( result );
                // });
                // } else {
                // result.status = config.status.ERROR;
                // result.Message = err.message;
                // }
                // return callback( result );
            }).catch(function(err) {
                console.log("ERROR:", err.message);
                result.status = config.status.ERROR;
                result.Message = err.message;
                return callback(result);
            });
        } else {
            result.status = config.status.ERROR;
            result.Message = 'No UserTask found.';
            return callback(result);
        }
    });
}

function updateTaskRanking(updateTaskRankingInput, callback) {
	console.log("updateTaskRanking Manager: " + JSON.stringify(updateTaskRankingInput));
	var result = {};
	var dummyRequest = updateTaskRankingInput;
//	dummyRequest.userId = "7";
//	dummyRequest.taskId = "51";
//	dummyRequest.roleId = "2";
//	dummyRequest.taskRemark = "Good";
//	var taskEvaluationArr = [{"taskEvaluationId": "6","rank": "4"}, {"taskEvaluationId": "7","rank": "3"}, {"taskEvaluationId": "8","rank": "1"}, {"taskEvaluationId": "9","rank": "1"}];
//	dummyRequest.taskEvaluation = taskEvaluationArr;
	console.log("Dummy Request: " +  JSON.stringify(dummyRequest));
	var data = updateTaskRankingInput.taskEvaluation;
	async.eachSeries(data, function(taskEvalId, asynccallback) {
		console.log("DATA====> "+ JSON.stringify(data));
		console.log(" taskEvalId====> " + JSON.stringify(taskEvalId));
	     taskEvaluationModel.findAll({
             where: {
                 id: taskEvalId.taskEvaluationId
             }
         }).then(function(userTaskEvaluationTaskData) {
        	 console.log("TaskEvaluation Data: " + JSON.stringify(userTaskEvaluationTaskData));
        	 console.log("Weightage: " + userTaskEvaluationTaskData[0].weightage);
        	 var weightage = userTaskEvaluationTaskData[0].weightage;
        	 console.log("Weightage: " + weightage + " Rank: " + taskEvalId.rank + " Total: " + (weightage*(taskEvalId.rank)));
             if (userTaskEvaluationTaskData != '') {
            	 var queryData = {where :{ taskEvaluationId : taskEvalId.taskEvaluationId,userId : dummyRequest.userId, taskId : dummyRequest.taskId}};
            	 var updatedData = {};
            	 updatedData.rating = taskEvalId.rank;
            	 updatedData.total = (weightage*(taskEvalId.rank));
            	 console.log("updatedData: " + JSON.stringify(updatedData));
            	 console.log("Where Parameter===> " + JSON.stringify(queryData));
            	 userTaskEvaluationModel.update(updatedData, queryData).then(function(userTaskEvaluationData) {
        			console.log("UserEvaluationTask updated Records: " + JSON.stringify(userTaskEvaluationData));
            	 }).catch(function(err) {
        		    console.log("ERROR while Updating:", err);
            	 });
             }
     	}).catch(function(err) {
     		console.log("Error ==>: " + err);
         });
	     asynccallback();
	}, function() {
        result.status = config.status.SUCCESS;
        result.message = config.status.TaskUpdatedSuccess;
        return callback(result);
    });
}

function getTaskPaginationRecords(requestParam, callback) {
	var pageNumber = requestParam.pageNumber;
	var recordLimit = requestParam.limit;
    var result = {};
    var count = 0;
    if( pageNumber != 0) {
    	count = ((pageNumber-1) * 10);
    } else {
    	count = 0;
    }
    taskModel.findAll({
    	 offset: count, 
    	 limit: recordLimit
    }).then(function(taskPaginationRecordsData) {
        if (taskPaginationRecordsData == '') {
            result.status = config.status.ERROR;
            result.message = config.status.NoResult;
        } else {
            result.message = taskPaginationRecordsData;
            callback(result);
        }
    }).catch(function(err) {
        console.log("ERROR:", err.message);
        result.status = config.status.ERROR;
        result.message = err;
        return result;
    });
}

module.exports = {
    createTask						: 	createTask,
    getTaskDetails					:	getTaskDetails,
    editTaskDetails					: 	editTaskDetails,
    createUserTaskEvaluation		: 	createUserTaskEvaluation,
    updateTaskRanking				: 	updateTaskRanking,
    getCompletedUserTaskEvaluation	: 	getCompletedUserTaskEvaluation,
    getTaskPaginationRecords		: 	getTaskPaginationRecords
};