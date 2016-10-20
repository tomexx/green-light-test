'use strict';

app.controller('timerController', ['$scope', '$timeout', function ($scope, $timeout) {
	$scope.time = 0;
	$scope.onTimeout = function() {
		$scope.time++;
		mytimeout = $timeout($scope.onTimeout, 1000);
	}
	var mytimeout = $timeout($scope.onTimeout, 1000);
}]);
