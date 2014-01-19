function TicTacToeCtrl ($scope) {
	$scope.cells = ['','','','','','','','',''];
	$scope.turn = 0;
	$scope.play = true;
	$scope.p1score = 0;
	$scope.p2score = 0;
	$scope.ties = 0;
	$scope.nextPlayer = $scope.player1 + ' is next!';
	$scope.stylePath = 'style.css';

	$scope.nextMove = function(x) {
		if ($scope.play) {	
			if ($scope.turn % 2 == 0 && $scope.cells[x] == '') {
				$scope.cells[x] = 'X';
				$scope.turn++;
				$scope.nextPlayer = $scope.player2 + ' is next!';
			}
			else if ($scope.cells[x] == '') {
				$scope.cells[x] = 'O';
				$scope.turn++;
				$scope.nextPlayer = $scope.player1 + ' is next!';
			}
			$scope.checkWin();
		};
	};

	$scope.checkWin = function() {
		if (($scope.cells[0] =='X' && $scope.cells[1]=='X' && $scope.cells[2] =='X') ||
			($scope.cells[3] =='X' && $scope.cells[4]=='X' && $scope.cells[5] =='X') ||
			($scope.cells[6] =='X' && $scope.cells[7]=='X' && $scope.cells[8] =='X') ||
			($scope.cells[0] =='X' && $scope.cells[3]=='X' && $scope.cells[6] =='X') ||
			($scope.cells[1] =='X' && $scope.cells[4]=='X' && $scope.cells[7] =='X') ||
			($scope.cells[2] =='X' && $scope.cells[5]=='X' && $scope.cells[8] =='X') ||
			($scope.cells[0] =='X' && $scope.cells[4]=='X' && $scope.cells[8] =='X') ||
			($scope.cells[2] =='X' && $scope.cells[4]=='X' && $scope.cells[6] =='X'))
		{
			$scope.winner = $scope.player1 + ' wins in ' + $scope.turn + ' moves!';
			$scope.nextPlayer = '';
			$scope.p1score++;
			$scope.play = false;
		}
		else if (($scope.cells[0] =='O' && $scope.cells[1]=='O' && $scope.cells[2] =='O') ||
			($scope.cells[3] =='O' && $scope.cells[4]=='O' && $scope.cells[5] =='O') ||
			($scope.cells[6] =='O' && $scope.cells[7]=='O' && $scope.cells[8] =='O') ||
			($scope.cells[0] =='O' && $scope.cells[3]=='O' && $scope.cells[6] =='O') ||
			($scope.cells[1] =='O' && $scope.cells[4]=='O' && $scope.cells[7] =='O') ||
			($scope.cells[2] =='O' && $scope.cells[5]=='O' && $scope.cells[8] =='O') ||
			($scope.cells[0] =='O' && $scope.cells[4]=='O' && $scope.cells[8] =='O') ||
			($scope.cells[2] =='O' && $scope.cells[4]=='O' && $scope.cells[6] =='O'))
		{
			$scope.winner = $scope.player2 +' wins in ' + $scope.turn + ' moves!';
			$scope.nextPlayer = '';
			$scope.p2score++;
			$scope.play = false;
		}
		else if ($scope.turn == 9) {
			$scope.winner = 'Draw!';
			$scope.nextPlayer = '';
			$scope.ties++;
			$scope.play = false;
		}
	};

	$scope.resetBoard = function() {
		$scope.cells = ['','','','','','','','',''];
		$scope.turn = 0;
		$scope.play = true;
		$scope.nextPlayer = $scope.player1 + ' is next!';
		$scope.winner = '';
	};

	$scope.clearTotals = function() {
		$scope.p1score = 0;
		$scope.p2score = 0;
		$scope.ties = 0;
		$scope.player1 = '';
		$scope.player2 = '';
	};

	$scope.changeStyle = function (){
		if ($scope.stylePath == 'style.css') {
			$scope.stylePath = 'style2.css';
		}
		else {
			$scope.stylePath = 'style.css';
		}
	}
};