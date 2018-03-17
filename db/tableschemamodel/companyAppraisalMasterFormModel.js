/*
 * 
 * Create and maintain the schema for the table appraisal.
 * 
 */
var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var companyCategoryModel = require('../../db/tableschemamodel/companyCategoryModel');
var companyModel = require('../../db/tableschemamodel/companyModel');

var companyAppraisalMasterFormModel = sequelize.define('company_appraisal_master_form', {
	formLabel : {
		type : Sequelize.STRING,
		allowNull : true
	},
	formType : {
		type : Sequelize.STRING,
		allowNull : true
	},
	formFormat : Sequelize.STRING,
	defaultValue : {
		type : Sequelize.STRING,
		allowNull : true,
		defaultValue : null
	},
	parentId : Sequelize.INTEGER,
	formPageOrder : Sequelize.INTEGER,
	formInputValues : Sequelize.STRING,
	isDeleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : false
	}
}, {
	freezeTableName : true,
});

companyAppraisalMasterFormModel.belongsTo(companyModel, {
	foreignKey : 'companyId',
	targetKey : 'companyId',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

companyAppraisalMasterFormModel.belongsTo(companyCategoryModel, {
	foreignKey : 'categoryId',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

/*
 companyAppraisalMasterFormModel.belongsTo(companyCategoryModel, {
	foreignKey : 'categoryId',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});
companyAppraisalMasterFormModel.belongsTo(companyAppraisalMasterFormModel,{
	foreignKey : 'id',
	targetKey : 'parentId',	as : 'formValues',
}
 );
sequelize.sync();
 */


module.exports = companyAppraisalMasterFormModel;
