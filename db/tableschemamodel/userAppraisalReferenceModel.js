/*
 * Create and maintain the schema for the table user_appraisal_reference.
 * 
 */
var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var companyCategoryModel = require('../../db/tableschemamodel/companyCategoryModel');
var companyModel = require('../../db/tableschemamodel/companyModel');
var companyAppraisalMasterFormModel = require('../../db/tableschemamodel/companyAppraisalMasterFormModel');
var userModel = require('../../db/tableschemamodel/userModel');
var userAppraisalModel = require('../../db/tableschemamodel/userAppraisalModel');

var userAppraisalReference = sequelize.define('user_appraisal_reference', {
	appraisalName : Sequelize.STRING,
	appraisalStatus : {
		type : Sequelize.ENUM,
		values : [ 'open', 'granted', 'notGranted' , 'managingDirectorApproval'],
		defaultValue : 'open'
	},
	appraisalUid : Sequelize.STRING,
	isDeleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : false
	}
}, {
	freezeTableName : true,
});

userAppraisalReference.belongsTo(userModel, {
	foreignKey : 'appraisalCreatedById',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}, as : 'createdBy'
});

userAppraisalReference.belongsTo(userModel, {
	foreignKey : 'appraiseeId',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}, as: 'appraisee'
});

userAppraisalReference.belongsTo(companyModel, {
	foreignKey : 'companyId',
	targetKey : 'companyId',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

userAppraisalReference.belongsTo(companyCategoryModel, {
	foreignKey : 'categoryId',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});



module.exports = userAppraisalReference;
