var config = require('./../config/config.json');
var userManager = require('./../modules/user/userManager');
//var taskManager = require('./../modules/user/taskManager');
module.exports = {
	// alert : {
	sendUserTask : function(app, createTaskRes) {
		userManager.getUserDetails({
			'id' : createTaskRes.userId
		}, function(userRes) {
			if (userRes.status == config.status.SUCCESS) {
				console.log(userRes);
				app.get('socket').to(userRes.message[0].userName).emit(
						'task add', createTaskRes);
			} else {
				// res.send(userRes);
			}
		});
	},
	sendCompletedTask : function(app, completedTaskRes) {
		userManager.getUserDetails({
			'id' : completedTaskRes.createdBy
		}, function(userRes) {
			if (userRes.status == config.status.SUCCESS) {
				console.log(userRes);
				app.get('socket').to(userRes.message[0].userName).emit('task completed', completedTaskRes);
			} else {
				// res.send(userRes);
			}
		});
	}
// }
};