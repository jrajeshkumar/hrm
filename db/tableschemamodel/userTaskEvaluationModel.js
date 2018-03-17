/**
 *  Create and define userTaskEvaluation table model schema.
 */

var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var userModel = require('../../db/tableschemamodel/userModel');
//var taskModel = require('../../db/tableschemamodel/taskModel');
var taskEvaluationModel = require('../../db/tableschemamodel/taskEvaluationModel');

var userTaskEvaluationModel = sequelize.define('user_task_evaluation', {
	rating : {
		type : Sequelize.STRING,
		allowNull : true,
	},
	total : {
		type : Sequelize.STRING,
		allowNull : true,
	}
}, {
	freezeTableName : true,
});


userTaskEvaluationModel.belongsTo(userModel, {
	foreignKey : 'userId',
	targetKey : 'id',
	type : Sequelize.STRING,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

/* userTaskEvaluationModel.belongsTo(taskModel, {
	foreignKey : 'taskId',
	targetKey : 'id',
	type : Sequelize.STRING,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
}); */

userTaskEvaluationModel.belongsTo(taskEvaluationModel, {
	foreignKey : 'taskEvaluationId',
	targetKey : 'id',
	type : Sequelize.STRING,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});



module.exports = userTaskEvaluationModel;
