/*
 * 
 * Create and define userModel table model schema.
 * 
 */
var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var userModel = sequelize.define('users', {
	employeeId : Sequelize.STRING,
	userName : {
		type : Sequelize.STRING,
		unique : true,
	},
	password : Sequelize.STRING,
	firstName : Sequelize.STRING,
	lastName : Sequelize.STRING,
	gender : {
		type : Sequelize.ENUM,
		values : [ 'Male', 'Female', 'Others' ]
	},
	maritalStatus : {
		type : Sequelize.ENUM,
		values : [ 'Single', 'Married']
	},
	dateOfBirth : Sequelize.DATEONLY,
	address : Sequelize.STRING,
	city : Sequelize.STRING,
	state : Sequelize.STRING,
	postalCode : Sequelize.STRING,
	phoneNumber : Sequelize.STRING,
	mobileNumber : Sequelize.STRING,
	probationPeriod : Sequelize.INTEGER,
	confirmationDate : Sequelize.DATEONLY,
	emergencyContactName : Sequelize.STRING,
	emergencyContactNumber : Sequelize.STRING,
	spouseName : Sequelize.STRING,
	fathersName : Sequelize.STRING,
	email : {
		type : Sequelize.STRING,
		unique : true,
		validate : {
			isEmail : true,
		}
	},
	joinedDate : {
		type : Sequelize.DATEONLY,
	},
	createdAt	: 	Sequelize.DATE,
	updatedAt 	: 	Sequelize.DATE,
	isDeleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : false
	}
}, {
	freezeTableName : true,
});
module.exports = userModel;
