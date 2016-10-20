'use strict';

app.filter('secondsToDateTime', ['$filter', function($filter) {
	return function(seconds) {
		return new Date(1970, 0, 1).setSeconds(seconds);
	};
}]);
