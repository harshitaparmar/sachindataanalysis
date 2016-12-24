myApp.factory('dataService',function($http){

	// this method first 
	var dataAPIS  =  {};
	var baseUrl = 'http://localhost:3030';
	// end get all surveys
	dataAPIS.getSachindata=function(){
		return $http.get(baseUrl +'/getSachindata');
	}
	
	return dataAPIS;

});//end of service 