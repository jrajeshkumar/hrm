/**
 * userManager handles all user related database operations.
 * 
 */
var config = require('./../../config/config.json');
var utils = require('./../../config/utils.js');
var md5 = require('md5');
var userModel = require('./../../db/tableschemamodel/userModel');
var userCompanyRoleModel = require('./../../db/tableschemamodel/userCompanyRoleModel');
var companyModel = require('./../../db/tableschemamodel/companyModel');

function createUser(userInput, callback) {
    if (userInput.employeeId == '' || userInput.employeeId == null) {
        userInput.employeeId = utils.uid(6);
    }
    userInput.password = md5('gis12345');
    var userDetails = userModel.build(userInput);
    var result = {};
    userDetails.save().then(function(userData) {
        if (userData == '') {
            result.status = config.status.ERROR;
            result.message = config.status.NoResult;
        } else {
            result.status = config.status.SUCCESS;
            result.message = userData;
        }
        return callback(result);
    }).catch(function(err) {
        console.log("ERROR:", err);
        result.status = config.status.ERROR;
        result.message = err.message;
        return callback(result);
    });
}

function getUserDetails(userInput, callback) {
    var condition = userInput;
    var result = {};
    userModel.findAll({
        where: condition
    }).then(function(userData) {
        if (userData == '') {
            result.status = config.status.ERROR;
            result.message = config.status.NoResult;
        } else {
            result.status = config.status.SUCCESS;
            result.message = userData;
        }
        return callback(result);
    }).catch(function(err) {
        console.log("ERROR:", err.message);
        result.status = config.status.ERROR;
        result.message = err.message;
        return callback(result);
    });
}function editUserDetails(queryData, userInput, callback) {
    var condition = {};
    condition.where = {};
    condition.where = queryData;
    var result = {};
    if (userInput.password) {
        userModel.findAll(condition).then(function(userData) {
            if (userData == '') {
                result.status = config.status.ERROR;
                result.message = config.status.NoResult;
                return callback(result);
            } else {
                var foundUser = userData[0];
                if (foundUser.password != md5(userInput.currentpassword)) {
                    console.log("Authentication failed. Wrong password. ");
                    result.status = config.status.ERROR;
                    result.message = "Wrong password.";
                    return callback(result);
                } else {
                    userInput.password = md5(userInput.password);
                    delete userInput.currentpassword;
                    foundUser.update(userInput).then(function(userRes) {
                        result.status = config.status.SUCCESS;
                        result.message = userRes;
                        return callback(result);
                    }).catch(function(err) {
                        console.log("ERROR:", err.message);
                        result.status = config.status.ERROR;
                        result.message = err.message;
                        return callback(result);
                    });
                }
            }
        }).catch(function(err) {
            console.log("ERROR:", err.message);
            result.status = config.status.ERROR;
            result.message = err.message;
            return callback(result);
        });
    } else {
        userModel.update(userInput, condition).then(function(item) {
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
}

function deleteUser(queryData, userInput, callback) {
    var condition = {};
    condition.where = {};
    condition.where = queryData;
    var result = {};
    userModel.update(userInput, condition).then(function(item) {
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

function getLoginUserDetails(userInput, callback) {
    var condition = userInput;
    var userId = userInput;
    var result = {};
    userModel.findAll().then(function(foundObject) {
        res.json({
            "Error": false,
            "status": "Success",
            "message": foundObject,
        });
    });
}

function validateEmployee(queryData, callback) {
    var result = {};
    userModel.find({
        where: queryData
    }).then(function(userRes) {
        if (userRes) {
            result.status = config.status.ERROR;
            result.message = false;
        } else {
            result.status = config.status.SUCCESS;
            result.message = true;
        }
        return callback(result);
    }).catch(function(err) {
        console.log("ERROR:", err.message);
        result.status = config.status.ERROR;
        result.message = '';
        return callback(result);
    });
}
module.exports = {
    createUser: createUser,
    getUserDetails: getUserDetails,
    editUserDetails: editUserDetails,
    validateEmployee: validateEmployee,
    deleteUser: deleteUser
};
