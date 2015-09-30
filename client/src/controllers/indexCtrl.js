angular.module('addressBook').controller('indexCtrl', [
  '$scope','$http', 'PhoneService',
  function($scope, $http,PhoneService) {
	$http.get("http://localhost:8080/api/people")
	.success(function(response) {
		$scope.message = response.people;
	  //$scope.message = PhoneService.list();
		var initals = [];
		for (var i in $scope.message) {
			var char = $scope.message[i].name.charAt(0);
			if(initals.indexOf(char) === -1){
				initals.push($scope.message[i].name.charAt(0));
			}	
		}
		initals.sort();
		$scope.InitalsAndvalues = [];
		var defaultShowPersonId = "";
		for (var int = 0; int < initals.length; int++) {
			var char = initals[int];
			var values = [];	
			for (var i in $scope.message) {
				var charFromMsg = $scope.message[i].name.charAt(0);
				if(charFromMsg === char){
					values.push({id:$scope.message[i].id,name:$scope.message[i].name});
				}	
			}
			
			values.sort(function(a, b){
				 var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
				 if (nameA < nameB) //sort string ascending
				  return -1 
				 if (nameA > nameB)
				  return 1
				 return 0 //default return value (no sorting)
			});
			
			if(int === 0){
				defaultShowPersonId = 	values[0].id;
			}
			$scope.InitalsAndvalues.push({key:char,values:values});
		}
		
		for (var i in $scope.message) {
			var id = $scope.message[i].id;
			if(id === defaultShowPersonId){
				$scope.personData = $scope.message[i];
			}	
		}	
		
	});
	$scope.personDataClick= function(idFromUI){
		for (var i in $scope.message) {
			var id = $scope.message[i].id;
			if(id === idFromUI){
				$scope.personData = $scope.message[i];
				break;
			}	
		}
	};
  }
]);