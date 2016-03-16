(function() {
    "use strict";

    angular.module("app", [])
	.value("model", {
	    user: "User",
	    userPhoto: "images/VG.jpg",
	    items: [
		{ "action": "Estimate...", "done": false },
		{ "action": "Create...", "done": false },
		{ "action": "Edit...", "done": true },
		{ "action": "Delete...", "done": false }
	    ]
	})
	.controller("Todo", Todo);

    function Todo($scope, model) {
	$scope.todo = model;
    }

})();