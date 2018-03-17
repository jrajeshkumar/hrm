/*
 * 
 * Create and define roles table model schema.
 * 
 */

var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');

var rolesModel = sequelize.define('roles', {
	roleName : {
		type : Sequelize.STRING,
		allowNull : false,
		unique : true
	},
	roleLevel : {
		type : Sequelize.INTEGER,
		allowNull : false,
		unique : true
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



module.exports = rolesModel;