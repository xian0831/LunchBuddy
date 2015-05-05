// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Define a new 'UserSchema'
var EventSchema = new Schema({
	cuisine: String,
	size: String,
	length: String,
	address: String,
	zip: String,
	description:String,
	host:String,
	users : { type : Array , "default" : [] }
});






// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
EventSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('Event', EventSchema);