'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Dataset = mongoose.model('Dataset'),
	_ = require('lodash');

/**
 * Create a dataset
 */
exports.create = function(req, res) {
	var dataset = new Dataset(req.body);
	dataset.user = req.user;

	dataset.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(dataset);
		}
	});
};

/**
 * Show the current dataset
 */
exports.read = function(req, res) {
	res.jsonp(req.dataset);
};

/**
 * Update a dataset
 * TODO: Not supported at this time
 */
exports.update = function(req, res) {
	res.render('error', {
		status: 500
	});		
};

/**
 * Delete a dataset
 */
exports.delete = function(req, res) {
	var dataset = req.dataset;

	dataset.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(dataset);
		}
	});
};

/**
 * List of Datasets
 */
exports.list = function(req, res) {
	Dataset.find().sort('-created').populate('user').exec(function(err, datasets) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(datasets);
		}
	});
};

/**
 * Dataset middleware
 */
exports.datasetByID = function(req, res, next, id) {
	Dataset.findById(id).populate('user').exec(function(err, dataset) {
		if (err) 
			return next(err);
		if (!dataset) 
			return next(new Error('Failed to load dataset ' + id));
		req.dataset = dataset;
		next();
	});
};

/**
 * Dataset authorization middleware
 * TODO: Pretty sure this is not a secure method.
 *       The request needs to check against the server assigned user.id.
 */
exports.hasAuthorization = function(req, res, next) {
	console.info(req.user);
	console.info(req.dataset);
	
	if (req.dataset.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};