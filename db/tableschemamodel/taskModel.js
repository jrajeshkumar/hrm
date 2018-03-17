/**
 * Create and define task table model schema.
 */

var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');
var companyModel = require('../../db/tableschemamodel/companyModel');
var userModel = require('../../db/tableschemamodel/userModel');
var userTaskEvaluationModel = require('../../db/tableschemamodel/userTaskEvaluationModel');

var taskModel = sequelize.define('tasks', {
	taskName : {
		type : Sequelize.STRING,
		allowNull : false
	},
	description : {
		type : Sequelize.STRING,
		allowNull : true
	},
	assignedDate : {
		type : Sequelize.DATEONLY,
		allowNull : false
	},
	createdBy : {
		type : Sequelize.INTEGER,
		allowNull : false
	},
	status : {
		type : Sequelize.ENUM,
		values : [ 'open', 'inProgress', 'closed', 'completed' ],
		defaultValue : 'open',
		allowNull : false
	},
	completedDate : Sequelize.DATE,
	createdAt : Sequelize.DATE,
	updatedAt : Sequelize.DATE,
	isDeleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : false
	},
	remarks : {
		type : Sequelize.STRING,
		allowNull : true
	}
}, {
	freezeTableName : true,
});

/* taskModel.belongsTo(taskEvaluationModel, {
	foreignKey : 'taskEvaluationId',
	//targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
}); */

userTaskEvaluationModel.hasOne(taskModel, {
	targetKey : 'taskId',
	 foreignKey : 'id',
	type : Sequelize.STRING,
	validate : {
		 isNumeric : true,
		 notEmpty : false,
		 allowNull : true
	}, constraints: false
});
 taskModel.hasMany(userTaskEvaluationModel, {
     as: 'userTaskEvaluation'
 });

taskModel.belongsTo(userModel, {
	foreignKey : 'userId',
	targetKey : 'id',
	type : Sequelize.STRING,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	},
	constraints : false
});
taskModel.belongsTo(userModel, {
	foreignKey : 'createdBy',
 targetKey : 'id',
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	},
	as : 'created',
	constraints : false
});

taskModel.belongsTo(companyModel, {
	foreignKey : 'companyId',
	targetKey : 'companyId',
	type : Sequelize.STRING,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});



module.exports = taskModel;