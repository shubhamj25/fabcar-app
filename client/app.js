// SPDX-License-Identifier: Apache-2.0

'use strict';

var app = angular.module('application', []);

// Angular Controller
app.controller('appController', function($scope, appFactory){

	$("#success_holder").hide();
	$("#success_create").hide();
	$("#error_holder").hide();
	$("#error_query").hide();
	
	$scope.queryAllCars = function(){

		appFactory.queryAllCars(function(data){
			var array = [];
			for (var i = 0; i < data.length; i++){
				parseInt(data[i].Key);
				data[i].Record.Key = parseInt(data[i].Key);
				array.push(data[i].Record);
			}
			array.sort(function(a, b) {
			    return parseFloat(a.Key) - parseFloat(b.Key);
			});
			$scope.all_car = array;
		});
	}

	$scope.queryCar = function(){

		var id = $scope.car_id;

		appFactory.queryCar(id, function(data){
			$scope.query_car = data;

			if ($scope.query_car == "Could not locate tuna"){
				console.log()
				$("#error_query").show();
			} else{
				$("#error_query").hide();
			}
		});
	}

	$scope.createCar = function(){

		appFactory.createCar($scope.car, function(data){
			$scope.create_car = data;
			$("#success_create").show();
		});
	}

	$scope.changeOwner = function(){

		appFactory.changeOwner($scope.owner, function(data){
			$scope.change_owner = data;
			if ($scope.change_owner == "Error: no tuna catch found"){
				$("#error_holder").show();
				$("#success_holder").hide();
			} else{
				$("#success_holder").show();
				$("#error_holder").hide();
			}
		});
	}

});

// Angular Factory
app.factory('appFactory', function($http){
	
	var factory = {};

    factory.queryAllCars = function(callback){

    	$http.get('/get_all_car/').success(function(output){
			callback(output)
		});
	}

	factory.queryCar = function(id, callback){
    	$http.get('/get_car/'+id).success(function(output){
			callback(output)
		});
	}

	factory.createCar = function(data, callback){

		var car = data.id + "-" + data.make + "-" + data.model + "-" + data.color + "-" + data.owner;

    	$http.get('/add_car/'+car).success(function(output){
			callback(output)
		});
	}

	factory.changeOwner = function(data, callback){

		var holder = data.id + "-" + data.name;

    	$http.get('/change_owner/'+holder).success(function(output){
			callback(output)
		});
	}

	return factory;
});


