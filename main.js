function TicTacToeCtrl($scope) {
	$scope.cells = ['', '', '', '', '', '', '', '', ''];
	$scope.turns = 0;
	$scope.play = true;
	$scope.p1score = 0;
	$scope.p2score = 0;
	$scope.ties = 0;
	$scope.nextPlayer = $scope.player1 + ' is next!';
	$scope.stylePath = 'style.css';

	$scope.nextMove = function(x) {
		if ($scope.play) {	
			if ($scope.turns % 2 == 0 && $scope.cells[x] == '') {
				$scope.cells[x] = 'X';
				$scope.turns++;
				$scope.nextPlayer = $scope.player2 + ' is next!';
			}
			else if ($scope.cells[x] == '') {
				$scope.cells[x] = 'O';
				$scope.turns++;
				$scope.nextPlayer = $scope.player1 + ' is next!';
			}
			$scope.checkWin();
		}
	};

	$scope.checkWin = function() {
		$scope.winArray = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
		for (var i = 0; i < $scope.winArray.length; i++) {
			if (($scope.cells[$scope.winArray[i][0]] == 'X' && $scope.cells[$scope.winArray[i][1]] == 'X' && $scope.cells[$scope.winArray[i][2]] == 'X')) {
				$scope.winner = $scope.player1 + ' wins in ' + $scope.turns + ' moves!';
				$scope.play = false;
				$scope.nextPlayer = '';
				$scope.p1score++;
			}
			else if (($scope.cells[$scope.winArray[i][0]] == 'O' && $scope.cells[$scope.winArray[i][1]] == 'O' && $scope.cells[$scope.winArray[i][2]] == 'O')) {
				$scope.winner = $scope.player2 +' wins in ' + $scope.turns + ' moves!';
				$scope.nextPlayer = '';
				$scope.p2score++;
				$scope.play = false;
			}
		}
		if ($scope.play && $scope.turns == 9) {
				$scope.winner = 'Draw!';
				$scope.nextPlayer = '';
				$scope.ties++;
				$scope.play = false;
			}
	};

	$scope.resetBoard = function() {
		$scope.cells = ['', '', '', '', '', '', '', '', ''];
		$scope.turns = 0;
		$scope.play = true;
		$scope.nextPlayer = $scope.player1 + ' is next!';
		$scope.winner = '';
	};

	$scope.clearTotals = function() {
		$scope.p1score = 0;
		$scope.p2score = 0;
		$scope.ties = 0;
	};

	$scope.changeStyle = function () {
		if ($scope.stylePath == 'style.css') {
			$scope.stylePath = 'style2.css';
		}
		else {
			$scope.stylePath = 'style.css';
		}
	};
}