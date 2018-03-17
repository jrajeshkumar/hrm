/**
 * Create and define companyCategory table model schema.
 */

var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var companyCategoryModel = sequelize.define('company_category', {

	categoryName : {
		type : Sequelize.STRING,
		unique : true,
		allowNull : false,
		validate : {
			notEmpty : true,
		}
	},
	urlString : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			notEmpty : true,
		}
	}

}, {
	freezeTableName : true,
});

module.exports = companyCategoryModel;