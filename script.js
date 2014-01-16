function TicTacToeCtrl ($scope) {
	var turn = 0;

	$scope.cells = ['','','','','','','','',''];

	$scope.reset = function() {
		$scope.cells = ['','','','','','','','',''];
		turn = 0;
	};

	$scope.nextMove = function($index) {
		var move = $scope.cells[$index];
		if (turn % 2==0 && move==''){
			$scope.cells[$index] = 'X';
			turn++;
		}
		else if (turn % 2 == 1 && move==''){
			$scope.cells[$index] = 'O';
			turn++;
		}
	};

	$scope.checkWin = function($index) {
	
	}

};