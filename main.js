var ticTacRef;
var IDs;
angular.module('TicTacToe', ["firebase"])
.controller('TicTacToeCtrl', function($scope, $firebase) {
    ticTacRef = new Firebase("https://fvtictactoe.firebaseio.com/");
 	$scope.fbRoot = $firebase(ticTacRef);

 	// Wait until everything really is loaded
 	$scope.fbRoot.$on("loaded", function() {
		IDs = $scope.fbRoot.$getIndex();
		if(IDs.length == 0)
		{
			// What???  No Board????  Let's build one.
	 		$scope.fbRoot.$add( { cells:['','','','','','','','',''], play:true, turns:0, p1score:0, p2score:0, ties:0, winner:'', nextPlayer:'', player1:'X', player2:'O'} );
			$scope.fbRoot.$on("change", function() {
				IDs = $scope.fbRoot.$getIndex();
				$scope.obj = $scope.fbRoot.$child(IDs[0]);
			});
		}
		else
		{
			$scope.obj = $scope.fbRoot.$child(IDs[0]);
		}
	});

    $scope.stylePath = 'style.css';
    // $scope.p1score = 0;
    // $scope.p2score = 0;
    // $scope.ties = 0;

    // $scope.startGame = function() {
    //     if ($scope.player2 == null) {
    //         if ($scope.player1 == null) {
    //             alert('Please enter player 1 name in scoreboard!');
    //         }
    //         else {
    //             alert('Please enter player 2 name in scoreboard!');
    //         }
    // 	}
    //     else if ($scope.player1 == null) {
    //         if ($scope.player2 == null) {
    //             alert('Please enter player 2 name in scoreboard!');
    //         }
    //         else {
    //             alert('Please enter player 1 name in scoreboard!');
    //         }
    //     }
    //     else {
            //$scope.play = true;
            //$scope.cells = ['', '', '', '', '', '', '', '', ''];
            //$scope.turns = 0;
            //$scope.winner = '';
            //$scope.nextPlayer = $scope.player1 + ' is next!';
    //     }        
    // };

    $scope.nextMove = function(x) {
        if ($scope.obj.play) {        
            if ($scope.obj.turns % 2 == 0 && $scope.obj.cells[x] == '') {
                $scope.obj.cells[x] = 'X';
                $scope.obj.turns++;
                $scope.obj.nextPlayer = $scope.obj.player2 + ' is next!';
                $scope.obj.$save();
            }
            else if ($scope.obj.cells[x] == '') {
             	$scope.obj.cells[x] = 'O';
                $scope.obj.turns++;
                $scope.obj.nextPlayer = $scope.obj.player1 + ' is next!';
                $scope.obj.$save();
            }
            $scope.checkWin();
        }
    };

    $scope.checkWin = function() {
        var y = $scope.winArray = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        for (var i = 0; i < y.length; i++) {
            if (($scope.obj.cells[y[i][0]] == 'X' && $scope.obj.cells[y[i][1]] == 'X' && $scope.obj.cells[y[i][2]] == 'X')) {
                $scope.obj.winner = $scope.obj.player1 + ' wins in ' + $scope.obj.turns + ' moves!';
                $scope.obj.play = false;
                $scope.obj.nextPlayer = '';
                $scope.obj.p1score++;
                $scope.obj.$save();
            }
            else if (($scope.obj.cells[y[i][0]] == 'O' && $scope.obj.cells[y[i][1]] == 'O' && $scope.obj.cells[y[i][2]] == 'O')) {
                $scope.obj.winner = $scope.obj.player2 +' wins in ' + $scope.obj.turns + ' moves!';
                $scope.obj.nextPlayer = '';
                $scope.obj.p2score++;
                $scope.obj.play = false;
                $scope.obj.$save();
            }
        }
        if ($scope.obj.play && $scope.obj.turns == 9) {
            $scope.obj.winner = 'Draw!';
            $scope.obj.nextPlayer = '';
            $scope.obj.ties++;
            $scope.obj.play = false;
            $scope.obj.$save();
        }
    };

    $scope.clearTotals = function() {
        $scope.obj.p1score = 0;
        $scope.obj.p2score = 0;
        $scope.obj.ties = 0;
        $scope.obj.$save;
    };

    $scope.changeStyle = function () {
        if ($scope.stylePath == 'style.css') {
            $scope.stylePath = 'style2.css';
        }
        else {
            $scope.stylePath = 'style.css';
        }
    };
});