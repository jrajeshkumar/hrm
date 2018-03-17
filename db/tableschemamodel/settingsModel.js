/*
 * 
 * Create and maintain the schema for the table company_settings.
 * 
 */
var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var companyModel = require('../../db/tableschemamodel/companyModel');

var settingsModel = sequelize.define('company_settings', {
	incrementFrom : {
		type : Sequelize.STRING,
		allowNull : true
	},
	incrementTo : {
		type : Sequelize.STRING,
		allowNull : true
	},
	isDeleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : false
	}
}, {
	freezeTableName : true,
});

settingsModel.belongsTo(companyModel, {
	foreignKey : 'companyId',
	targetKey : 'companyId',
	type : Sequelize.STRING,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	}
});

module.exports = settingsModel;
