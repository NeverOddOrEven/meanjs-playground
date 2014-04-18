'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Dataset Schema
 */
var DatasetSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Name cannot be blank'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	originalFileName: {
		type: String,
		default: '',
		trim: true,
		required: 'Original filename cannot be blank'
	},
	originalFileLastModified: {
		type: Date,
		required: 'File last modified date cannot be blank'
	},
	// Consider storing this stand-alone and using a reference 
	//   as an app performance optimization later
	originalFileContent: {
		type: Schema.Types.Mixed,
		required: 'File must contain some content to be saved'
	}
});

mongoose.model('Dataset', DatasetSchema);