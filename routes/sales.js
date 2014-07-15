/*jslint node:true*/

var salesData = require('./salesData.js');
var request = require('request');

var env = JSON.parse(process.env.VCAP_SERVICES);
var service = env['user-provided'][0]['credentials'];

exports.getSales = function(resA, customer) {
	console.log('About to call CICS app');
	var url = service.url + '/salesreq?ciUser=' + service.username + '&ciPassword=' + service.password;
	
	console.log('URL info: ' + url);
	console.log('About to send to CICS system.');
	
	request.get(url, function(error, response, body){
		if (error || response.statusCode !== 200) {
			console.error("Error fetching CICS Data. Using fallback data");
			resA.json(salesData.getSalesData(customer));
			return;
		}
		console.log('Parsing result from CICS system.');
		var data = JSON.parse(body);
		// Extract the sales data
		var responseData = data.INNOV01OperationResponse;
		console.log('CICS response object');
		console.log(responseData);
		var salesgroup = responseData.salesgrp;
		resA.json(salesgroup.salesreq);
	});
};