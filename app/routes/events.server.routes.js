// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var events = require('../../app/controllers/events.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'signup' routes 
	app.route('/android/event')
		.get(events.findEvent)
		.post(events.createEvent);
	app.route('/android/event/:zip')
		.get(events.findEvent);

	app.route('/android/event/host/:host_name')
		.get(events.findEventByHost);

	// Set up the 'signup' routes 
	app.route('/android/find')
		.post(events.findEvent);

	app.route('/android/event/join/:event_id')
		.post(events.joinEvent);

	app.route('/android/event/cancel/:event_id')
		.post(events.cancelEvent);

	app.route('/android/event/leave/:event_id/:user_id')
		.post(events.leaveEvent);

	app.get('/loginfail', function(req, res) {

		res.status(200).json({
			"auth": "fail"
		})
	});

	app.get('/loginsuccess', function(req, res) {

		res.status(200).json({
			"auth": "success"
		})
	});

	
};