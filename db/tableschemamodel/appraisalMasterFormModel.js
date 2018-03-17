/*
 * 
 * Create and maintain the schema for the table appraisal.
 * 
 */
var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var companyCategoryModel = require('../../db/tableschemamodel/companyCategoryModel');

var appraisalMasterFormModel = sequelize.define('appraisal_master_form', {
	formLabel : {
		type : Sequelize.STRING,
		allowNull : true
	},
	formType : {
		type : Sequelize.STRING,
		allowNull : true
	},
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

appraisalMasterFormModel.belongsTo(companyCategoryModel, {
	foreignKey : 'categoryId',
	targetKey : 'id',
	type : Sequelize.INTEGER,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

module.exports = appraisalMasterFormModel;
