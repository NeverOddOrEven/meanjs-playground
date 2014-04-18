'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.html'
		}).
		state('datamanagement', {
			url: '/datamanagement',
			views: {
				"" : { /*main template containing the columns below*/
					templateUrl: 'modules/datamanagement/views/home.html' 
				},
				'menuarea@datamanagement': {
					templateUrl: 'modules/datamanagement/views/sources.html'
				},
				'workarea@datamanagement': {
					templateUrl: 'modules/datamanagement/views/makeselection.html'
				}
			},
			onEnter: function () {
				console.log("entered datamanagement state");
			}
		}).
		state('goto tidbits', {
			url: '/tidbits',
			templateUrl: 'modules/tidbits/views/home.html'
		}).
		state('goto crosstabs', {
			url: '/crosstabs',
			templateUrl: 'modules/crosstabs/views/home.html'
		}).
		state('goto marketresearch', {
			url: '/marketresearch',
			templateUrl: 'modules/marketresearch/views/home.html'
		});
	}
]);