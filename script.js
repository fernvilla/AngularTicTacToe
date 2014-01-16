function TicTacToeCtrl ($scope) {

	$scope.cells = ['X','','O','','','','','',''];

	$scope.reset = function() {
		$scope.cells = ['','','','','','','','',''];
	};



};