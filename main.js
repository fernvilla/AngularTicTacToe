var myApp = angular.module('TicTacToe', ["firebase"]);
myApp.controller('TicTacToeCtrl', function($scope, $firebase) {
    var ticTacRef = new Firebase("https://fvtictactoe.firebaseio.com/");
 	$scope.fbRoot = $firebase(ticTacRef);

 	$scope.fbRoot.$on("loaded", function() {
		var IDs = $scope.fbRoot.$getIndex();
		if(IDs.length == 0) {
	 		$scope.fbRoot.$add({ 
	 			cells:['','','','','','','','',''], 
	 			play: true, 
	 			turns: 0, 
	 			p1score: 0, 
	 			p2score: 0, 
	 			ties: 0, 
	 			winner: '', 
	 			nextPlayer: 'Player 1, your move!', 
	 			player1: 'X', 
	 			player2: 'O',
	 		});
			$scope.fbRoot.$on("change", function() {
				IDs = $scope.fbRoot.$getIndex();
				$scope.obj = $scope.fbRoot.$child(IDs[0]);
			});
		}
		else {
			$scope.obj = $scope.fbRoot.$child(IDs[0]);
		}
	});

	var mySymbol;
	$scope.stylePath = 'style.css';

    $scope.nextMove = function(x) {
        if ($scope.obj.play) {        
            if ($scope.obj.turns % 2 == 0 && ($scope.obj.cells[x] == '' && mySymbol != 'O')) {
            	mySymbol = 'X'; 
				$scope.obj.cells[x] = mySymbol;
				$scope.obj.turns++;
				$scope.obj.nextPlayer = $scope.obj.player2 + ' is next!';
				$scope.obj.$save();
            }
            else if ($scope.obj.turns % 2 == 1 && ($scope.obj.cells[x] == '' && mySymbol != 'X')) {
            	mySymbol = 'O';
				$scope.obj.cells[x] = mySymbol;
				$scope.obj.turns++;
				$scope.obj.nextPlayer = $scope.obj.player1 + ' is next!';
				$scope.obj.$save();	
            }
        checkWin();  
        }
    };

    function checkWin() {
    	var cell = $scope.obj.cells;
       	var win = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

        for (var i = 0; i < win.length; i++) {
            if ((cell[win[i][0]] == 'X' && cell[win[i][1]] == 'X' && cell[win[i][2]] == 'X')) {
                $scope.obj.winner = $scope.obj.player1 + ' wins in ' + $scope.obj.turns + ' moves!';
                $scope.obj.play = false;
                $scope.obj.nextPlayer = '';
                $scope.obj.p1score++;
                $scope.obj.$save();
                logIt();
            }
            else if ((cell[win[i][0]] == 'O' && cell[win[i][1]] == 'O' && cell[win[i][2]] == 'O')) {
                $scope.obj.winner = $scope.obj.player2 +' wins in ' + $scope.obj.turns + ' moves!';
                $scope.obj.nextPlayer = '';
                $scope.obj.p2score++;
                $scope.obj.play = false;
                $scope.obj.$save();
                logIt();
            }
        }
        if ($scope.obj.play && $scope.obj.turns == 9) {
            $scope.obj.winner = 'Draw!';
            $scope.obj.nextPlayer = '';
            $scope.obj.ties++;
            $scope.obj.play = false;
            $scope.obj.$save();
            logIt();
        }
    };

    var logRef = new Firebase('https://fvtictactoe.firebaseio.com/');
	$scope.logs = $firebase(logRef.limit(5));

    function logIt() {
    	$scope.logs.$add({
			outcome: $scope.obj.winner 
		});
    };

    $scope.resetGame = function() {
    	if (!$scope.obj.play) { // Prevent players from restarting game before it's over
	    	$scope.obj.$set({ 
				cells:['','','','','','','','',''], 
				play: true, 
				turns: 0,
				p1score: $scope.obj.p1score,
				p2score: $scope.obj.p2score,
				ties: $scope.obj.ties,
				winner: '', 
				nextPlayer: $scope.obj.player1 + ', your move!', 
				player1: $scope.obj.player1, 
				player2: $scope.obj.player2
	    	});
    	}
    	else {
	    	alert("Game isn't over yet!");
	    }
    };

    $scope.clearTotals = function() {
        $scope.obj.$set({
        	cells:['','','','','','','','',''], 
			play: true, 
			turns: 0, 
			p1score: 0,
			p2score: 0,
			ties:0,
			winner: '', 
			nextPlayer: $scope.obj.player1 + ', your move!', 
			player1: $scope.obj.player1, 
			player2: $scope.obj.player2
        });
    };

    // Function that changes the current stylesheet
    $scope.changeStyle = function() {
        if ($scope.stylePath == 'style.css') {
            $scope.stylePath = 'style2.css';
        }
        else {
            $scope.stylePath = 'style.css';
        }
    };   
});

// Controller for chat application
myApp.controller('ChatCtrl', function($scope, $firebase) {
	var chatRef = new Firebase('https://fvtictactoe.firebaseio.com/');
	$scope.messages = $firebase(chatRef.limit(15));

  	$scope.addMessage = function() {
		$scope.messages.$add({
			from: $scope.username + ': ', 
			content: $scope.message 
		});
		$scope.message = '';
  	}
});