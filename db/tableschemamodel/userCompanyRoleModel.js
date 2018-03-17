/**
 * Create and define UserCompanyRole table model schema.
 */

var sequelize = require('../../db/dbconnection/sequelize.js');
var Sequelize = require('sequelize');
var companyModel = require('../../db/tableschemamodel/companyModel');
var roleModel = require('../../db/tableschemamodel/rolesModel');
var userModel = require('../../db/tableschemamodel/userModel');

var userCompanyRole = sequelize.define('user_company_roles', {
	parentId : Sequelize.INTEGER,
	order : Sequelize.INTEGER,
	createdAt : Sequelize.DATE,
	updatedAt : Sequelize.DATE,
	isDeleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : false
	}

}, {
	freezeTableName : true,
});

userCompanyRole.belongsTo(userModel, {
	foreignKey : 'userId'
});
userCompanyRole.belongsTo(roleModel, {
	foreignKey : 'roleId'
});
userCompanyRole.belongsTo(companyModel, {
	foreignKey : 'companyId',
	targetKey : 'companyId',
	type : Sequelize.STRING,
});

module.exports = userCompanyRole;
