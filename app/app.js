(function() {
    "use strict";

    angular.module("app", [])
	.value("model", {
	    user: "User",
	    userPhoto: "images/VZ.jpg"
	})
	.controller("Todo", Todo)
	.filter("checkedItems", checkedItems)
	.directive("taskList", taskList)
	.run(runApp);

    function Todo($scope, model) {

		$scope.todo = model;
		$scope.incompleteCount = incompleteCount;
		$scope.warningLevel = warningLevel;
		$scope.addNewItem = addNewItem;

		function incompleteCount(items) {
			var count = 0;
			angular.forEach(items, function(item) {
				if (!item.done) count++;
			});
			return count;
		}

		function warningLevel(items) {
			return incompleteCount(items) < 3 ? "label-success" : "label-warning"
		}

		function addNewItem(items, newItem) {
			if (newItem && newItem.action) {
				items.push({
					action: newItem.action,
					done: false
				});
				newItem.action = "";
			}
		}

    }

    function checkedItems() {
    	return function(items, showComplete) {
    		var res = [];
    		if (angular.isArray(items)) {
    			angular.forEach(items, function(item) {
    				if (item.done ===false || showComplete === true) {
    					res.push(item);
    				}
    			});
    			return res;
    		} else {
    			return items;
    		}
    	};
    }

    function runApp($http, model) {
    	$http
    		.get("todo.json")
    		.success(function(data) {
    			model.items = data;
    		});
    }

    function taskList() {
    	return {
    		restrict: "A",
    		templateUrl: "tasks-table.html"
    	};
    }

})();