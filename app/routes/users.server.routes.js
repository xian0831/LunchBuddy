// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'signup' routes 
	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);

	// Set up the 'signin' routes 
	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		}));

	// Set up the 'signin' routes  for andorid
	app.route('/android/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', {
			successRedirect: '/loginsuccess',
			failureRedirect: '/loginfail',
		}));

	// Set up the 'signin' routes  for andorid
	app.route('/android/signup')
		.post(users.signup);

	// Set up the 'signin' routes  for andorid
	app.route('/android/icon/:username')
		.get(users.findProfileIcon);


	app.get('/loginfail/:message', function(req, res) {
		//user_exist: user already exist
		
		res.status(200).json({
			"auth": req.params.message
		})

	});

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

	// Set up the Facebook OAuth routes 
	app.get('/oauth/facebook', passport.authenticate('facebook', {
		failureRedirect: '/signin'
	}));
	app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/signin',
		successRedirect: '/'
	}));

	// Set up the Twitter OAuth routes 
	app.get('/oauth/twitter', passport.authenticate('twitter', {
		failureRedirect: '/signin'
	}));
	app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
		failureRedirect: '/signin',
		successRedirect: '/'
	}));

	// Set up the Google OAuth routes 
	app.get('/oauth/google', passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		],
		failureRedirect: '/signin'
	}));
	app.get('/oauth/google/callback', passport.authenticate('google', {
		failureRedirect: '/signin',
		successRedirect: '/'
	}));

	// Set up the 'signout' route
	app.get('/signout', users.signout);

	
};