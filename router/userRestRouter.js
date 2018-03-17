/**
 * Manages user based rest services.
 */

var config = require('./../config/config.json');
var utils = require('./../config/utils.js');

var leaveManager =  require('./../modules/user/leaveManager');
var userManager = require('./../modules/user/userManager');
var userCompanyRoleManager =  require('./../modules/company/userCompanyRoleManager');

function USER_REST_ROUTER(router) {
	var self = this;
	self.handleRoutes(router);
}

USER_REST_ROUTER.prototype.handleRoutes = function(router) {
	var self = this;
	
	/*
	 * 
	 * Create a user.
	 * 
	 */
	
	router.post("/user/createUser", function(req, res) {
		userManager.createUser(req.body, function(userRes){
			if(userRes.status == config.status.SUCCESS) {
				userRes.userId = userRes.message.id;
				userRes.roleId = req.body.roleId;
				userRes.companyId = req.body.companyId;
				userRes.parentId = req.body.parentId;
				userCompanyRoleManager.createUserCompanyRole(userRes, function(userCompanyRoleRes) {
					console.log(userRes);
				});
				res.send(userRes);
			} else {
				res.send(userRes);
			}
		});
	});
	
	

	/*
	 * Get all undeleted users.
	 * 
	 */
	router.post("/user/getUsers", function(req, res) {
		userManager.getUserDetails(req.body, function(userRes){
			if(userRes.status == config.status.SUCCESS) {
				res.send(userRes);
			} else {
				res.send(userRes);
			}
		});
	});

	/*
	 * 
	 * user leave.
	 * 
	 */
	
	router.post("/user/createleave", function(req, res) {
		userManager.createUser(req.body, function(userRes){
			if(userRes.status == config.status.SUCCESS) {
				userRes.userId = userRes.message.id;
				userRes.roleId = req.body.roleId;
				userRes.companyId = req.body.companyId;
				userRes.parentId = req.body.parentId;
				userCompanyRoleManager.createUserCompanyRole(userRes, function(userCompanyRoleRes) {
					console.log(userRes);
				});
				res.send(userRes);
			} else {
				res.send(userRes);
			}
		});
	});
	/*
	 * 
	 * Delete a user by userId.
	 * 
	 */
	router.delete("/user/deleteUser/:user_id", function(req, res) {
		userManager.deleteUser({
			id : req.params.user_id
		},{
			isDeleted : true,
		}).then(function(userRes) {
			res.send(userRes);
		});
	});

	/*
	 * 
	 * Update a user by userId.
	 * 
	 */
	router.post("/user/updateUser/:user_id", function(req, res) {
		userManager.editUserDetails({
			id : req.params.user_id
		}, req.body,function(userRes) {
				res.send(userRes);
		});
	});
	/*
	 * 
	 * Update a userprofileimg by userId.
	 * 
	 */
	router.post("/user/updateUserprofileimg/:user_id", function(req, res) {
		userManager.getUserDetails({
			id : req.params.user_id
		},function(userRes) {
				res.send(userRes);req.files.profileimg ;
		});
	});
	
	/*
	 * 
	 * validateEmployee.
	 * 
	 */
	router.get("/user/validateEmployee/:employeeId", function(req, res) {
		userManager.validateEmployee(req.params, function(userRes){
				res.send(userRes);
		});
	});
	

	/*
	 * 
	 * Create a leave.
	 * 
	 */
	
	router.post("/leave/createLeave", function(req, res) {
		leaveManager.createLeave(req.body, function(userleaveRes){
			if(userleaveRes.status == config.status.SUCCESS) {
				res.send(userleaveRes);
			} else {
				res.send(userleaveRes);
			}
		});
	});
	/*
	 * Get all undeleted leave.
	 * 
	 */
	router.post("/leave/getLeave", function(req, res) {
		leaveManager.getLeave(req.body, function(userRes){
			if(userRes.status == config.status.SUCCESS) {
				
				res.send(userRes);
			} else {
				res.send(userRes);
			}
		});
	});
	/*
	 * 
	 * Update a leave by leaveId.
	 * 
	 */
	router.post("/leave/updateLeave/:leave_id", function(req, res) {
		leaveManager.editLeave({
			id : req.params.leave_id
		}, req.body,function(userleaveRes) {
				res.send(userleaveRes);
		});
	});
	/*
	 * 
	 * Delete a leave by userId.
	 * 
	 */
	router.delete("/leave/deleteLeave/:leave_id", function(req, res) {
		leaveManager.editLeave({
			id : req.params.leave_id
		},{
			isDeleted : true,
		}).then(function(leaveRes) {
			res.send(leaveRes);
		});
	});
	/*
	 * 
	 * userCompanyRole.
	 * 
	 */
	router.post("/userRole/getUserAndCompanyRole", function(req, res) {
	userCompanyRoleManager.getUserCompanyRole(req.body,function(leaveRes) {
	res.send(leaveRes);
	});
	});
};

module.exports = USER_REST_ROUTER;