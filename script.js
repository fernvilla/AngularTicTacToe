function TicTacToeCtrl ($scope) {
	var turn = 0;
	var play = true;
	$scope.p1score = 0;
	$scope.p2score = 0;
	$scope.ties = 0;
	$scope.nextPlayer = $scope.player1 + ' is next!';
	$scope.cells = ['','','','','','','','',''];
	$scope.stylePath = 'style.css';

	$scope.resetBoard = function() {
		$scope.cells = ['','','','','','','','',''];
		turn = 0;
		play = true;
		$scope.nextPlayer = $scope.player1 + ' is next!';
		$scope.winner = '';
	};

	$scope.nextMove = function($index) {
		var cellBox = $scope.cells[$index];
		if (play) {	
			if (turn % 2 == 0 && cellBox == '') {
				$scope.cells[$index] = 'X';
				turn++;
				$scope.nextPlayer = $scope.player2 + ' is next!';
			}
			else if (cellBox == '') {
				$scope.cells[$index] = 'O';
				turn++;
				$scope.nextPlayer = $scope.player1 + ' is next!';
			}
			checkWin(cellBox);
		};
	};

	function checkWin(x) {
		if (($scope.cells[0] =='X' && $scope.cells[1]=='X' && $scope.cells[2] =='X') ||
			($scope.cells[3] =='X' && $scope.cells[4]=='X' && $scope.cells[5] =='X') ||
			($scope.cells[6] =='X' && $scope.cells[7]=='X' && $scope.cells[8] =='X') ||
			($scope.cells[0] =='X' && $scope.cells[3]=='X' && $scope.cells[6] =='X') ||
			($scope.cells[1] =='X' && $scope.cells[4]=='X' && $scope.cells[7] =='X') ||
			($scope.cells[2] =='X' && $scope.cells[5]=='X' && $scope.cells[8] =='X') ||
			($scope.cells[0] =='X' && $scope.cells[4]=='X' && $scope.cells[8] =='X') ||
			($scope.cells[2] =='X' && $scope.cells[4]=='X' && $scope.cells[6] =='X'))
		{
			$scope.winner = $scope.player1 + ' wins in ' + turn + ' moves!';
			$scope.nextPlayer = '';
			$scope.p1score++;
			play = false;
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
			$scope.winner = $scope.player2 +' wins in ' + turn + ' moves!';
			$scope.nextPlayer = '';
			$scope.p2score++;
			play = false;
		}
		else if (turn == 9) {
			$scope.winner = 'Draw!';
			$scope.nextPlayer = '';
			$scope.ties++;
			play = false;
		}
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