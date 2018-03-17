/**
 *  Manages role based rest services.
 */

var roleManager = require('./../modules/role/roleManager');
var userCompanyRoleModel = require('./../db/tableschemamodel/userCompanyRoleModel');
var userModel = require('./../db/tableschemamodel/userModel');
var rolesModel = require('./../db/tableschemamodel/rolesModel');
var sequelize = require('./../db/dbconnection/sequelize.js');

var config = require('./../config/config.json');

var lodash = require('lodash');
var async = require('async');

function ROLE_REST_ROUTER(router) {
	var self = this;
	self.handleRoutes(router);
}

ROLE_REST_ROUTER.prototype.handleRoutes = function(router) {
    var self = this;
    router.post("/role/createUserRole", function(req, res) {
        roleManager.createUserRole(req.body, function(companyRes) {
            res.send(companyRes);
        });
    });
    router.post("/role/getUserRole", function(req, res) {
        roleManager.getUserRole(req.body, function(companyRes) {
            res.send(companyRes);
        });
    });
    router.put("/role/editUserRole/:id", function(req, res) {
        roleManager.editUserRole(req.params, req.body, function(companyRes) {
            res.send(companyRes);
        });
    });
    /*
     * 
     * Get userCompanyRole details for role hierarchy.
     * 
     */
    router.post("/userRole/getUserCompanyRole", function(req, res) {
        if (lodash.keys(req.body).length) {
            sequelize.query('SELECT `user_company_roles`.`id`, `user_company_roles`.`parentId`, `user_company_roles`.`order`, `user_company_roles`.`createdAt`, `user_company_roles`.`updatedAt`, `user_company_roles`.`isDeleted`, `user_company_roles`.`userId`, `user_company_roles`.`roleId`, `user_company_roles`.`companyId`, `user`.`id` AS `user.id`, `user`.`userName` AS `user.userName`, `user`.`employeeId` AS `user.employeeId`, `role`.`id` AS `role.id`, `role`.`roleName` AS `role.roleName`  from  (select * from user_company_roles     order by parentid, userid) user_company_roles LEFT OUTER JOIN `users` AS `user` ON `user_company_roles`.`userId` = `user`.`id` LEFT OUTER JOIN `roles` AS `role` ON `user_company_roles`.`roleId` = `role`.`id`,(select @pv := :userId) v			        where   (find_in_set(parentid, @pv) > 0 and     @pv := concat(@pv, ",", userid)) or userid= :userId', {
                replacements: req.body,
                type: sequelize.QueryTypes.SELECT
            }).then(function(foundObject) {
                var setData = function(roledata, role, val) {
                    role.hasOwnProperty(roledata[0]) ? '' : role[roledata[0]] = {};
                    role[roledata[0]][roledata[01]] = role[val];
                    delete role[val];
                };
                async.forEach(foundObject, function(role, asynccallback) {
                    var dataval = lodash.keys(role);
                    for (var j = 0; j < dataval.length; j++) {
                        var roledata =dataval[j].split('.');
                        roledata.length > 1 ? setData(roledata,role, dataval[j]) : '';
                    }
                    asynccallback();
                }, function() {
                    console.log(foundObject);
                    res.json({
                        "error": false,
                        "status": "Success",
                        "message": foundObject,
                    });
                });
            });
        } else {
            userCompanyRoleModel.findAll({
                where: req.body,
                include: [{
                    model: userModel,
                    attributes: ['id', 'userName', 'employeeId']
                }, {
                    model: rolesModel,
                    attributes: ['id', 'roleName']
                }]
            }).then(function(foundObject) {
                res.json({
                    "error": false,
                    "status": "Success",
                    "message": foundObject,
                });
            });
        }
    });
};

module.exports = ROLE_REST_ROUTER;