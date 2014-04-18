'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	datasets = require('../../app/controllers/datasets');

module.exports = function(app) {
	// Datasets Routes
	app.get('/datasets', datasets.list);
	app.post('/datasets', users.requiresLogin, datasets.create);
	app.get('/datasets/:datasetId', datasets.read);
	//TODO: Support updates eventually
	//app.put('/datasets/:datasetId', users.requiresLogin, datasets.hasAuthorization, datasets.update);
	app.del('/datasets/:datasetId', users.requiresLogin, datasets.hasAuthorization, datasets.delete);

	// Finish by binding the dataset middleware
	app.param('datasetId', datasets.datasetByID);
};