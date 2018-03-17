/*
 * Creates a one global Sequelize connection for entire application.
 * 
 */
var Sequelize = require('sequelize');
var PropertiesReader = require('properties-reader');
var properties = new PropertiesReader('./config/properties/app.properties');
var define = require("node-constants")(exports);
var service = require('../../service/service.js');

/*
 * Establish Mysql database connection through Sequelize ORM.
 * 
 */
var sequelize = new Sequelize(properties.get('database.name'), properties.get('database.username'), 
		service.decrypt(properties.get('database.password')), {
	host : properties.get('sequelize.host'),
	dialect : properties.get('sequelize.dialect'),
	pool : {
		max : properties.get('sequelize.max'),
		min : properties.get('sequelize.min'),
		idle : properties.get('sequelize.idle')
	},
});
sequelize.sync();
module.exports = sequelize;