function TicTacToeCtrl ($scope) {

	$scope.cells = ['','','','','','','','',''];

	$scope.reset = function() {
		$scope.cells = ['','','','','','','','',''];
	};

	$scope.nextMove = function($index) {
		$scope.cells[$index] = 'X';
	};

};