'use strict';

app.directive('timer', function($document) {
	return {
		restrict: 'E',
		controller: 'timerController',
		controllerAs: 'timer',
		templateUrl: 'views/templates/timer.html'
	};
});
