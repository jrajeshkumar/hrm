/*
 * Create and maintain the schema for the table user_appraisal.
 * 
 */
var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var companyCategoryModel = require('../../db/tableschemamodel/companyCategoryModel');
var companyModel = require('../../db/tableschemamodel/companyModel');
var companyAppraisalMasterFormModel = require('../../db/tableschemamodel/companyAppraisalMasterFormModel');
var userModel = require('../../db/tableschemamodel/userModel');

var userAppraisalModel = sequelize.define('user_appraisal', {
	appraisalUid : Sequelize.STRING,
	formValues : Sequelize.TEXT,
	isDeleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : false
	}
}, {
	freezeTableName : true,
});

userAppraisalModel.belongsTo(companyAppraisalMasterFormModel, {
	foreignKey : 'appraisalId',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});
userAppraisalModel.belongsTo(companyAppraisalMasterFormModel, {
	foreignKey : 'valueId',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

userAppraisalModel.belongsTo(userModel, {
	foreignKey : 'appraisalCreatedById',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

userAppraisalModel.belongsTo(userModel, {
	foreignKey : 'appraiseeId',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

userAppraisalModel.belongsTo(companyModel, {
	foreignKey : 'companyId',
	targetKey : 'companyId',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

userAppraisalModel.belongsTo(companyCategoryModel, {
	foreignKey : 'categoryId',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});



module.exports = userAppraisalModel;
