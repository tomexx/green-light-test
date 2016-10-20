'use strict';

app.directive('images', function($document) {
	return {
		restrict: 'E',
		controller: 'imagesController',
		controllerAs: 'images',
		templateUrl: 'views/templates/images.html'
	};
});
