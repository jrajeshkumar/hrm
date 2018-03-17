/*
 * 
 * Create and maintain the schema for the table appraisal_final_form.
 * 
 */
var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var userModel = require('../../db/tableschemamodel/userModel');
var companyModel = require('../../db/tableschemamodel/companyModel');
var appraisalFinalFormModel = require('../../db/tableschemamodel/appraisalFinalFormModel');

var companyAppraisalFinalFormModel = sequelize.define('company_appraisal_final_form', {
	appraisalUid : Sequelize.STRING,
	reportingManagerFeedback : Sequelize.BOOLEAN,
	managingDirectorFeedback : Sequelize.BOOLEAN,
	commentByManagingDirector : Sequelize.STRING,
	commentByReportingManager : Sequelize.STRING,
	isDeleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : false
	}
}, {
	freezeTableName : true,
});

companyAppraisalFinalFormModel.belongsTo(appraisalFinalFormModel, {
	foreignKey : 'typeActionId',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

companyAppraisalFinalFormModel.belongsTo(userModel, {
	foreignKey : 'appraisalCreatedById',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

companyAppraisalFinalFormModel.belongsTo(userModel, {
	foreignKey : 'appraiseeId',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

companyAppraisalFinalFormModel.belongsTo(companyModel, {
	foreignKey : 'companyId',
	targetKey : 'companyId',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

module.exports = companyAppraisalFinalFormModel;
