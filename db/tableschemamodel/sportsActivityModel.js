/*
 * 
 * Create and maintain the schema for the table sports_activity_model.
 * 
 */
var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var appraisalFinalFormModel = sequelize.define('sports_activity_model', {
	typeAction : {
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

module.exports = appraisalFinalFormModel;
