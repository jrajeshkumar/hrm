/**
 * Create and define taskEvaluation table model schema.
 */


var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var taskEvaluationModel = sequelize.define('taskEvaluation', {
	name : {
		type : Sequelize.STRING,
		allowNull : false,
		unique : true
	},
	weightage : {
		type : Sequelize.STRING,
		allowNull : false,
		unique : true
	},
	type : {
		type : Sequelize.STRING
	},
	description : {
		type : Sequelize.STRING,
		allowNull : true,
	},
	createdAt : Sequelize.DATE,
	updatedAt : Sequelize.DATE
}, {
	freezeTableName : true,
});



module.exports = taskEvaluationModel;