'use strict'


angular.module('movieApp', ['ngRoute'])

	.config(function($routeProvider) {
	    $routeProvider
	        .when('/home', {
	            templateUrl: 'assets/views/home.html',
	            controller: 'homeCtrl'
	        });
	})

	
	
	.controller('homeCtrl', function($scope, movieSrv, saveSrv) {
		
	    	$('#searchButton').on('click', function (e) {

	    		$scope.movies = '';
	    		var arr = ';'

	    		var name = $('#nameText').val().toLowerCase();
	    		
	    		movieSrv.getMovies(name).then(function(data){
	    			
	    			arr = data.data[0].filmography.actor.map(function(a, b){
	    				   return a.title;
	    				});
	    				$scope.movies = arr;	
	    		});
	    				saveSrv.setObject(name, arr);

    			});
	    		
	    	})
	    	
 
   
    .service('movieSrv', function($http, $q) {
    		this.getMovies = function(name) {
	    		var q = $q.defer();
	    		var url = 'http://theimdbapi.org/api/find/person?name=' + name;

	    		$http.get(url)
	    			.then(function(data){
	    				q.resolve(data);
	    			}, function error(err) {
	    				q.reject(err);
	    			});
	    			
	    			return q.promise;
	    		};
    	})
    
   
    
    .service('saveSrv', function($window, $http){
    	
		  this.setObject = function(key, value){
			 $window.localStorage[key] = JSON.stringify(value);
			  
			/* var res = key.split(" ");
			 var firstName = res[0];
			 var lastName = res[1];
			  
			  $.ajax({
					type:			'PUT',
					url:				'../../' + lastName + '_' + firstName,
					data:			json,
					contentType: 	'application/json',
					async:			true,
					success:		function(data){
						buildOutput(ALL_DOCS, 0, '');
					},
					error:		function(XMLHttpRequest, textStatus, errorThrown){
						console.log(errorThrown); 
					}
				});*/
			 
		

					  $http.put('../../' + key, value);
				  };
				  
				  this.getObject = function(key){
					  return JSON.parse($window.localStorage[key] || '{}');
				  };
			});
			  
