function TicTacToeCtrl ($scope) {
	$scope.setBoard = function() {
		//Initialize array
		$scope.cells = ['','','','','','','','',''];
		//Set first player string and score totals to zero
		$scope.nextPlayer = 'X';
		$scope.p1score = 0;
		$scope.p2score = 0;
		$scope.ties = 0;
		//Set initial stylesheet
		$scope.stylePath = 'style.css';
	}

	//call function to initially set board
	$scope.setBoard();






}