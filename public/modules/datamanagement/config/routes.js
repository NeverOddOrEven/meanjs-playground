'use strict';

// Setting up route
angular.module('datamanagement').config(['$stateProvider',
	function($stateProvider, $urlRouterProvider) {
		
		// Data management state routing
		$stateProvider.
			state('addsourcedata', {
				url: '/datamanagement/addsourcedata',
				templateUrl: 'modules/datamanagement/views/home.html',
				views: {
					"" : { /*main template containing the columns below*/
					templateUrl: 'modules/datamanagement/views/home.html' 
					},
					'menuarea@addsourcedata': {
						templateUrl: 'modules/datamanagement/views/sources.html'
					},
					'workarea@addsourcedata': {
						templateUrl: 'modules/datamanagement/views/addsourcedata.html'
					}
				},
				onEnter: function () {
					console.log("entered addsourcedata state");
				}
			})
			.state('listexistingsources', {
				url: '/datamanagement/listexistingsources',
				templateUrl: 'modules/datamanagement/views/home.html',
				views: {
					"" : { /*main template containing the columns below*/
					templateUrl: 'modules/datamanagement/views/home.html' 
					},
					'menuarea@listexistingsources': {
						templateUrl: 'modules/datamanagement/views/sources.html'
					},
					'workarea@listexistingsources': {
						templateUrl: 'modules/datamanagement/views/listexistingsources.html'
					}
				},
				onEnter: function () {
					console.log("entered listexistingsources state");
				}
			})
			.state('viewexistingsource', {
				url: '/datamanagement/viewexistingsource/:datasetId',
				templateUrl: 'modules/datamanagement/views/home.html',
				views: {
					"" : { /*main template containing the columns below*/
					templateUrl: 'modules/datamanagement/views/home.html' 
					},
					'menuarea@viewexistingsource': {
						templateUrl: 'modules/datamanagement/views/sources.html'
					},
					'workarea@viewexistingsource': {
						templateUrl: 'modules/datamanagement/views/viewexistingsource.html'
					}
				},
				onEnter: function () {
					console.log("entered viewexistingsource state");
				}
			});
		//state('createArticle', {
		//	url: '/articles/create',
		//	templateUrl: 'modules/articles/views/create.html'
		//});
	}
]);