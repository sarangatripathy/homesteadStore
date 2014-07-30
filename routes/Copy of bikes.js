/*jslint node:true*/

/*
 * GET bikes page (specials)
 */

var specials = require('./specials.js');

window.alert("Bike script");

exports.getSpecials = function(req, res) {
	res.json(specials.getSpecials());
};


exports.bikes = function(req, res) {
	res.render('bikes', {
		bicycles : specials.getSpecials()
	});
};
