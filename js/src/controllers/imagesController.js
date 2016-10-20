'use strict';

app.controller('imagesController', ['$scope', function ($scope) {
	$scope.swapped = false;
	$scope.swap = function() {
		$scope.swapped = !$scope.swapped;
	}
}]);
