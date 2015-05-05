// Invoke 'strict' JavaScript mode
'use strict';

var Event = require('mongoose').model('Event');


// Create a new controller method that creates new 'regular' users
exports.createEvent = function(req, res, next) {
	// If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
	if (!req.event) {
		// Create a new 'User' model instance
		var event = new Event(req.body);
		var message = null;


		// Try saving the new user document
		event.save(function(err) {

			if (err) {
				return res.redirect('/loginfail');

			}

			return res.redirect('/loginsuccess');
		});
	} else {
		return res.redirect('/');
	}
};

// Create a new controller method that creates new 'regular' users
exports.findEvent = function(req, res, next) {
	// If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
	if (!req.event) {
		// Create a new 'User' model instance
		var event = new Event(req.body);
		var message = null;



		Event.find({
			zip: req.params.zip
		}, function(err, docs) {
			res.json(docs);

		});


	} else {
		return res.redirect('/');
	}
};

// Create a new controller method that creates new 'regular' users
exports.findEventByHost = function(req, res, next) {
	// If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
	if (!req.event) {
		// Create a new 'User' model instance
		var event = new Event(req.body);
		var message = null;



		Event.findOne({
			host: req.params.host_name
		}, function(err, docs) {
			res.json(docs);

		});


	} else {
		return res.redirect('/');
	}
};

// Create a new controller method that creates new 'regular' users
exports.joinEvent = function(req, res, next) {
	// If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
	if (!req.event) {
		// Create a new 'User' model instance
		var event = new Event(req.body);
		var message = null;

		var event_id = req.params.event_id;

		Event.findByIdAndUpdate(
			event_id, {
				$push: {
					"users": req.body
				}
			}, {
				safe: true,
				upsert: true
			},
			function(err, model) {
				if (err) {
					console.log(req.params.event_id);
					return res.send(err);
				}
				return res.json(model);
			});


	} else {
		return res.redirect('/');
	}
};


exports.leaveEvent = function(req, res, next) {
	// If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
	if (!req.event) {
		// Create a new 'User' model instance
		var event = new Event(req.body);
		var message = null;

		var event_id = req.params.event_id;
		var user_id = req.params.user_id;

		Event.findByIdAndUpdate(
			event_id, {
				$pull: {
					"users": {
						"username": user_id
					}
				}
			},

			function(err, model) {
				if (err) {
					console.log(req.params.event_id);
					return res.send(err);
				}
				return res.json(model);
			});


	} else {
		return res.redirect('/');
	}
};

exports.cancelEvent = function(req, res, next) {
	// If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
	if (!req.event) {
		// Create a new 'User' model instance
		var event = new Event(req.body);
		var message = null;

		var event_id = req.params.event_id;


		Event.findByIdAndRemove(
			event_id,
			function(err, model) {
				if (err) {
					console.log(req.params.event_id);
					return res.send(err);
				}
				return res.json(model);
			});


	} else {
		return res.redirect('/');
	}
};