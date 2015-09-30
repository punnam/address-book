/* Services */
angular.module('addressBook').service('PhoneService',['$http',
  function($http){
		this.list= function(){
			alert("Punnam");
		   $http.get("http://localhost:8080/api/people")
		    .success(function(response) {
		    	return response.people;
		    });
		}	
    }
]);