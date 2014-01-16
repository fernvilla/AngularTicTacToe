function TicTacToeCtrl ($scope) {
	var turn = 0;
	var play = true;
	$scope.nextPlayer = 'X is next!';

	$scope.cells = ['','','','','','','','',''];

	$scope.reset = function() {
		$scope.cells = ['','','','','','','','',''];
		turn = 0;
		$scope.nextPlayer = 'X is next!';
		$scope.winner = '';
	};

	$scope.nextMove = function($index) {
		var cellBox = $scope.cells[$index];

		if (turn % 2 == 0 && cellBox == '') {
			$scope.cells[$index] = 'X';
			turn++;
			$scope.nextPlayer = 'O is next!';
		}
		else if (cellBox == '') {
			$scope.cells[$index] = 'O';
			turn++;
			$scope.nextPlayer = 'X is next!';
		}
		checkWin($scope.cells[$index]);
	};

	function checkWin(x) {
		if (($scope.cells[0] =='X' && $scope.cells[1]=='X' && $scope.cells[2] =='X') ||
			($scope.cells[3] =='X' && $scope.cells[4]=='X' && $scope.cells[5] =='X') ||
			($scope.cells[6] =='X' && $scope.cells[7]=='X' && $scope.cells[8] =='X') ||
			($scope.cells[0] =='X' && $scope.cells[3]=='X' && $scope.cells[6] =='X') ||
			($scope.cells[1] =='X' && $scope.cells[4]=='X' && $scope.cells[6] =='X') ||
			($scope.cells[2] =='X' && $scope.cells[6]=='X' && $scope.cells[8] =='X') ||
			($scope.cells[0] =='X' && $scope.cells[4]=='X' && $scope.cells[8] =='X') ||
			($scope.cells[2] =='X' && $scope.cells[4]=='X' && $scope.cells[6] =='X'))
		{
			$scope.winner = 'X Wins!';
			$scope.nextPlayer = '';
		}
		else if (($scope.cells[0] =='O' && $scope.cells[1]=='O' && $scope.cells[2] =='O') ||
			($scope.cells[3] =='O' && $scope.cells[4]=='O' && $scope.cells[5] =='O') ||
			($scope.cells[6] =='O' && $scope.cells[7]=='O' && $scope.cells[8] =='O') ||
			($scope.cells[0] =='O' && $scope.cells[3]=='O' && $scope.cells[6] =='O') ||
			($scope.cells[1] =='O' && $scope.cells[4]=='O' && $scope.cells[6] =='O') ||
			($scope.cells[2] =='O' && $scope.cells[6]=='O' && $scope.cells[8] =='O') ||
			($scope.cells[0] =='O' && $scope.cells[4]=='O' && $scope.cells[8] =='O') ||
			($scope.cells[2] =='O' && $scope.cells[4]=='O' && $scope.cells[6] =='O'))
		{
			$scope.winner = 'O Wins!';
			$scope.nextPlayer = '';
		}
		else if (turn == 9) {
			$scope.winner = 'Draw!';
			$scope.nextPlayer = '';
		}
	}


};