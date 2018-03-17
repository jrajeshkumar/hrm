/**
 * Manages company based rest services.
 */

var companyManager = require('./../modules/company/companyManager');


function COMPANY_REST_ROUTER(router) {
	var self = this;
	self.handleRoutes(router);
}

COMPANY_REST_ROUTER.prototype.handleRoutes = function(router) {
	var self = this;
	
	router.post("/company/createCompany", function(req, res) {
		companyManager.createCompany(req.body, function(companyRes){
			res.send(companyRes);
		});
	});
	
	
	router.post("/company/getCompanyDetails", function(req, res) {
		companyManager.getCompanyDetails(req.body, function(companyRes){
			res.send(companyRes);
		});
	});

	router.put("/company/editCompanyDetails/:id", function(req, res) {
		companyManager.editCompanyDetails(req.params, req.body, function(companyRes){
			res.send(companyRes);
		});
	});
	
};

module.exports = COMPANY_REST_ROUTER;