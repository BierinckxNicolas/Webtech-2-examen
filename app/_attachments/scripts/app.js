'use strict'


angular.module('movieApp', ['ngRoute'])

	.config(function($routeProvider) {
	    $routeProvider
	        .when('/home', {
	            templateUrl: 'assets/views/home.html',
	            controller: 'homeCtrl'
	        });
	})

	
	
	.controller('homeCtrl', function($scope, movieSrv) {
		
	    	$('#searchButton').on('click', function (e) {

	    		$scope.movies = '';

	    		var name = $('#nameText').val();
	    		
	    		movieSrv.getMovies(name).then(function(data){
	    			
	    			var arr = data.data[0].filmography.actor.map(function(a, b){
	    				   return a.title;
	    				});
	    				$scope.movies = arr;
	    			
	    			//$scope.movies = data.data[0].filmography.actor;				
	    		
	    		});
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
			  //Save in CouchDB
			  //$http.put('../../' + key, value);
		  };
		  
		  this.getObject = function(key){
			  return JSON.parse($window.localStorage[key] || '{}');
		  };
	});