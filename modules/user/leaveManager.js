/**
 * leaveManager handles all leave related database operations.
 * 
 */
var config = require('./../../config/config.json');
var utils = require('./../../config/utils.js');
var userModel = require('./../../db/tableschemamodel/userModel');
var leaveModel = require('./../../db/tableschemamodel/leaveModel');
var companyModel = require('./../../db/tableschemamodel/companyModel');

function createLeave(userInput, callback) {
    var leaveData = leaveModel.build(userInput);
    var result = {};
    leaveData.save().then(function(leaveData) {
        if (leaveData == '') {
            result.status = config.status.ERROR;
            result.message = config.status.NoResult;
        } else {
            result.status = config.status.SUCCESS;
            result.message = leaveData;
        }
        return callback(result);
    }).catch(function(err) {
        console.log("ERROR:", err);
        result.status = config.status.ERROR;
        result.message = err.message;
        return callback(result);
    });
}
function getLeave(userInput, callback) {
    var condition = userInput;
    var result = {};
    leaveModel.findAll({
        where: condition
    }).then(function(leaveData) {
        if (leaveData == '') {
            result.status = config.status.ERROR;
            result.message = config.status.NoResult;
        } else {
            result.status = config.status.SUCCESS;
            result.message = leaveData;
        }
        return callback(result);
    }).catch(function(err) {
        console.log("ERROR:", err.message);
        result.status = config.status.ERROR;
        result.message = err.message;
        return callback(result);
    });
}

function editLeave(queryData, userInput, callback) {
    var condition = {};
    condition.where = {};
    condition.where = queryData;
    var result = {};
    leaveModel.update(userInput, condition).then(function(item) {
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

module.exports = {
		createLeave: createLeave,
		getLeave: getLeave,
		editLeave: editLeave
};