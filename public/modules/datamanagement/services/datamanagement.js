'use strict';

//Datasets service used for communicating with the articles REST endpoints
angular.module('datamanagement').factory('Datasets', ['$resource', function($resource) {
    return $resource('datasets/:datasetId', {
        datasetId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);