'use strict';

angular.module('datamanagement').controller('DataManagementController', ['$scope', '$stateParams', '$location', '$fileUploader', 'Authentication', 'Datasets',
    function($scope, $stateParams, $location, $fileUploader, Authentication, Datasets) {
        /* Initialize scope variables */
		$scope.authentication = Authentication;
		
		console.log('am i crazy');
		
		$scope.wtf = 'hello?';
		
		$scope.isLoading = false;
		$scope.fileDropPrompt = "Drop XLS or XLSX file";
		$scope.pagingOptions = {
			pageSizes: [25, 50, 100],
			pageSize: 25,
			currentPage: 1
		};
		
		/* 
		*  Both are only used for UI 
		*  API is hardened against client-side manipulation 
		*/
		$scope.canDelete = false;
		$scope.canCreate = false;
		
		/* Utilities to load and parse excel files */
		var excelUtil = new ExcelUtil(startingFileLoadCallback, completingFileLoadCallback);
		var uploader = $scope.uploader = $fileUploader.create({
			scope: $scope
		});
		
		/*
		*  Invoked when the user interacts with the paging values in the grid
		*/
		$scope.$watch('pagingOptions', function (newVal, oldVal) {
			if (newVal !== oldVal || 
				(newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize)) {
			  console.log("Paging options changed. New: " + newVal + " Old: " + oldVal);
			  setPagedDataForGrid($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.spreadsheetData);
			}
		}, true);

		function startingFileLoadCallback(filename) {
			$scope.isLoading = true;
			$scope.fileDropPrompt = filename;
		};
		
		function completingFileLoadCallback(json) {
			$scope.isLoading = false;
			initializeDataGrid(json);
			
			// Loaded from a file, therefore it can be added to the server
			$scope.canCreate = true;
		}
		
		function setPagedDataForGrid(pageSize, page, data) {
			$scope.pagedData = data.slice((page - 1) * pageSize, page * pageSize);
			console.log("Setting paged data. Page size: " + pageSize + " Page: " + page + ".");
		};
		
		function setGridData(json) {
			$scope.spreadsheetData = json;
			setPagedDataForGrid($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, json);
		}
		
		function configureGrid(json) {
			// TODO: Do some better error checking / reporting
			if (!json)
				return;
				
			var colDefs = makeColDefs(json[0]);
			$scope.totalRecordsLoaded = json.length;
			$scope.spreadsheetOptions = { 
				data: 'pagedData', 
				columnDefs: colDefs,
				enableColumnResize: true,
				enablePaging: true,
				showFooter: true,
				totalServerItems: 'totalRecordsLoaded',
				pagingOptions: $scope.pagingOptions,
				filterOptions: $scope.filterOptions
			};
			
			setGridData(json);
		};
		
		/* Only used when loaded from database - for now */
		function initializeUI(datasetInstance) {
			$scope.datasetId = datasetInstance._id;
			$scope.datasetname = datasetInstance.name;
			$scope.createdon = datasetInstance.created;
			$scope.originalfilename = datasetInstance.originalFileName;
			$scope.originalfilemodified = datasetInstance.originalFileLastModified;
			$scope.canDelete = true;	// TODO: Check for authorization first
		}
			
		function initializeDataGrid(originalFileContentsJSON) {
			if(!$scope.$$phase) {			// Called when loading a new data set
				$scope.$apply(function() {
					configureGrid(originalFileContentsJSON);
				});
			} else {						// Called when loading an existing data set
				configureGrid(originalFileContentsJSON);
			}
		}
				
		uploader.bind('afteraddingfile', function (event, item) {
            console.info('After adding a file', item);
			excelUtil.LoadFile(item.file);
			
			// TODO: Disable uploading further files
        });

        /**
		 * Create a colDefs array for use with ng-grid "gridOptions". Pass in an object
		 * which is a single row of your data!
		 */
		function makeColDefs(row) {
			var colDefs = [];
			for ( var colName in row) {
				colDefs.push({
					'field' : colName,
					'width' : 75
				});
			}
			return colDefs;
		}
		
		/* Begin Controller Methods */
		$scope.create = function() {
            var dataset = new Datasets({
                name: this.datasetName,
                originalFileName: $scope.fileDropPrompt, //TODO: Probably want to use a better name or variable here
				originalFileLastModified: new Date(1957, 9, 9),
				originalFileContent: $scope.spreadsheetData
			});

            dataset.$save(function(response) {
                $location.path('/datamanagement/viewexistingsource/' + response._id);
            });
        };
		
		$scope.getExistingSources = function() {
			Datasets.query(function(datasets) {
                $scope.datasets = datasets;
            });
		};
		
		$scope.getExistingSource = function() {
			Datasets.get({
                datasetId: $stateParams.datasetId
            }, function(dataset) {
				initializeUI(dataset);
				initializeDataGrid(dataset.originalFileContent);
            });
        };
		
		$scope.remove = function(dataset) {
			Datasets.delete({
                datasetId: $scope.datasetId
            }, function(arg) {
				console.info(arg);
				$location.path('/datamanagement/listexistingsources');
            });
		};
    }
]);