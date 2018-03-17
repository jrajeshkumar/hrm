/**
 * Create and define companyTaskEvaluation table model schema.
 */

var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var companyModel = require('../../db/tableschemamodel/companyModel');

var companyTaskEvaluationModel = sequelize.define('company_task_evaluation', {
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
	}
}, {
	freezeTableName : true,
});


companyTaskEvaluationModel.belongsTo(companyModel, {
	foreignKey : 'companyId',
	targetKey : 'companyId',
	type : Sequelize.STRING,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});



module.exports = companyTaskEvaluationModel;