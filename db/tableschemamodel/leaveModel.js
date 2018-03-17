/**
 * Create and define task table model schema.
 */

var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');
var companyModel = require('../../db/tableschemamodel/companyModel');
var userModel = require('../../db/tableschemamodel/userModel');

var leaveModel = sequelize.define('leave', {
	reason : {
		type : Sequelize.STRING,
		allowNull : true
	},
	fromDate : {
		type : Sequelize.DATE,
		allowNull : false
	},
	toDate : {
		type : Sequelize.DATE,
		allowNull : false
	},
	createdBy : {
		type : Sequelize.INTEGER,
		allowNull : false
	},
	status : {
		type : Sequelize.ENUM,
		values : [ 'open', 'yes', 'no' ],
		defaultValue : 'open',
		allowNull : false
	},
	selectedLeaveType : {
		type : Sequelize.STRING,
		defaultValue : '',
		allowNull : false
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

leaveModel.belongsTo(userModel, {
	foreignKey : 'userId',
 targetKey : 'id',
	type : Sequelize.STRING,
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	},
	constraints : false
});
leaveModel.belongsTo(userModel, {
	foreignKey : 'createdBy',
 targetKey : 'id',
	validate : {
		isNumeric : true,
		notEmpty : true,
		allowNull : false
	},
	as : 'created',
	constraints : false
});

leaveModel.belongsTo(companyModel, {
	foreignKey : 'companyId',
	targetKey : 'companyId',
	type : Sequelize.STRING,
	validate : {
		isNumeric : true,
		notEmpty : false,
		allowNull : false
	}
});
module.exports = leaveModel;