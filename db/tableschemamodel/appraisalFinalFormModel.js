/*
 * 
 * Create and maintain the schema for the table appraisal_final_form.
 * 
 */
var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var appraisalFinalFormModel = sequelize.define('appraisal_final_form', {
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
