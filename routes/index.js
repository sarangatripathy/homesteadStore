/*jslint node:true*/

/*
 * GET home page.
 */


var inventory = require('./inventory.js');
var specials = require('./specials.js');
var sales = require('./sales.js');

var specialName = '';

/*
 * Set the current season value. Can be one
 * of the following: winter, spring, summer, fall.
 */
var currentSeason = 'spring';

exports.getSpecial = function(req, res) {
	res.json({"specialName" : specialName});
};

exports.setSpecial = function(req, res) {
	if (req.body.specialName) {
		specialName = req.body.specialName;
	}
	res.redirect('/');
};

var getSeasonalInventory = function() {
	return inventory.getSeasonInventory();
};


var getSeasonalInventoryWithSpecials = function() {
	var inv = inventory.getSeasonInventory();
	var spec = specials.getSpecials();
	return spec.concat(inv);
};

exports.getInventory = function(req, res) {
	res.json(getSeasonalInventory());
};

exports.getSpecials = function(req, res) {
	res.json(specials.getSpecials());
};

// Update to pass the correct user.
/*
var customerName = "Fall Back";
exports.getSales = function(req, res) {
	sales.getSales(res, customerName);
};
*/

exports.index = function(req, res) {
	res.render('index', {
		inventory : getSeasonalInventory(),
		specials : specials.getSpecials()
	});
};