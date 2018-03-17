/*
 * 
 * Create and maintain the schema for the table company.
 * 
 */
var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var companyModel = sequelize.define('companies', {
	companyId : {
		type : Sequelize.STRING,
		allowNull : false,
		unique : true
	},
	name : {
		type : Sequelize.STRING,
		allowNull : false
	},
	address : Sequelize.STRING,
	city : Sequelize.STRING,
	state : Sequelize.STRING,
	country : Sequelize.STRING,
	categoryId : Sequelize.STRING,
	contactNumber : Sequelize.STRING,
	email : Sequelize.STRING,
	companyPrefix : Sequelize.STRING,
	logo : Sequelize.BLOB,
	isActive : {
		type : Sequelize.BOOLEAN,
		defaultValue : true
	},
	createdAt : Sequelize.DATE,
	updatedAt : Sequelize.DATE,
	isDeleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : false
	}
}, {
	freezeTableName : true,
});

module.exports = companyModel;
