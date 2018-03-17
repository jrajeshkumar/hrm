/**
 * taskManager handles all task related database operations.
 * 
 */
var taskModel = require('./../../db/tableschemamodel/taskModel');
var taskEvaluationModel = require('./../../db/tableschemamodel/taskEvaluationModel');
var config = require('./../../config/config.json');
var utils = require('./../../config/utils');

function createTaskEvaluation(taskInput, callback) {
    var taskDetails = taskEvaluationModel.build(taskInput);
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

function getTaskEvaluationDetails(taskInput, callback) {
    var condition = taskInput;
    var result = {};
    taskEvaluationModel.findAll({
        where: condition
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

function editTaskEvaluationDetails(queryData, taskInput, callback) {
    var condition = {};
    condition.where = {};
    condition.where = queryData;
    var result = {};
    taskEvaluationModel.update(taskInput, condition).then(function(item) {
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

function deleteTaskEvaluationDetails(queryData, taskInput, callback) {
    var condition = {};
    condition.where = {};
    condition.where = queryData;
    var result = {};
    taskEvaluationModel.update(taskInput, condition).then(function(item) {
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

function getWeightageByTaskEvaluationId(taskEvaluationId) {
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
            return result;
        }
    }).catch(function(err) {
        console.log("ERROR:", err.message);
        result.status = config.status.ERROR;
        result.message = err;
        return result;
    });
}

function createUserTaskEvaluation(userTaskEvaluationInput) {
    var input = {};
    console.log(">>>>>>1 : " + userTaskEvaluationInput.message.taskEvaluationId);
    var result = getWeightageByTaskEvaluationId(userTaskEvaluationInput.message.taskEvaluationId).done(function(json) {
        console.log("Done: " + json);
    });
    console.log("result: " + JSON.stringify(result));
    input.name = userTaskEvaluationInput.message.taskName;
    input.weightage = taskEvaluation.message.weightage;
    input.type = taskEvaluation.message.type;
    input.description = userTaskEvaluationInput.message.description;
    input.rating = null;
    input.total = null;
    input.userId = userTaskEvaluationInput.message.userId;
    input.taskId = userTaskEvaluationInput.message.id;
    input.taskEvaluationId = userTaskEvaluationInput.message.taskEvaluationId;
    var userTaskEvaluationDetails = userTaskEvaluationModel.build(input);
    var result = {};
    userTaskEvaluationDetails.save().then(function(userTaskEvaluationData) {
        if (userTaskEvaluationData == '') {
            result.status = config.status.ERROR;
            result.message = config.status.NoResult;
        } else {
            result.status = config.status.SUCCESS;
            result.message = userTaskEvaluationData;
        }
        // return callback(result);
    }).catch(function(err) {
        console.log("ERROR:", err.message);
        result.status = config.status.ERROR;
        result.message = err.message;
        // return callback( result);
    });
}

module.exports = {
	    createTaskEvaluation			: createTaskEvaluation,
    getTaskEvaluationDetails			: getTaskEvaluationDetails,
	    editTaskEvaluationDetails		: editTaskEvaluationDetails,
	    deleteTaskEvaluationDetails		: deleteTaskEvaluationDetails
};