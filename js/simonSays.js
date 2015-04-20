angular.module('simonSaysApp', [])


	.factory('gameOptionsDTO', function(){

		function gameOptionsDTO() {

		}

		gameOptionsDTO.prototype.dataObject = function() {
			
		};
			
			return gameOptionsDTO;
		})


	.service('turns', function(){

	})

	.value('gameOptionz', 

		{
			colorOptions: {
				yellow: 'yellow', 
				green: 'green', 
				blue: 'blue', 
				red: 'red',
				},
			random: ['yellow', 'green', 'blue', 'red'],
			simonsTurn: false,
			yourTurn: false,
			simonMoves: [],
			yourMoves: [],
			displayMoves: [],

		}

	)

	.controller('control', function($timeout, $interval, $log, gameOptionsDTO, gameOptionz, turns){

		var self = this;

		self.gO = gameOptionz;

		self.isDisabled = true;

		var i = 0;

		self.yourTurn = function(colorSelect) {
			
			//run animation function on usr click
			self.clickedColor = colorSelect;
			self.selectSquare(self.clickedColor);

			self.gO.yourMoves.push({move: self.clickedColor});

			self.len--;

			self.yourMove = self.gO.yourMoves[i].move;
			self.simonsMove = self.gO.simonMoves[i].move;

			if ( self.yourMove === self.simonsMove ) {

				i++;

				self.gO.displayMoves.push({simon: self.yourMove, you: self.simonsMove});

				// if your selections 
				if ( self.gO.yourMoves.length === self.gO.simonMoves.length) {
						
					self.gO.yourMoves = [];

					self.isDisabled = true;

					$timeout(function(){
						self.gO.displayMoves = [];
						self.simonsTurn();
					}, 1500);

					i = 0;
				}	

			} else {
					
					self.gO.simonsTurn = false;
					self.isDisabled = true;
					self.gameOver = true;


				$timeout(function(){
					i = 0;
					self.isDisabled = true;
					self.gO.yourMoves = [];
					self.gO.simonMoves = [];
					self.gO.displayMoves = [];
					self.gO.yourTurn = false;
					self.startBtn = false; //shows play again btn
					self.gameOver = false;

					console.log('Play Again?');
				}, 2000);
			}

		}


		self.simonsTurn = function(){

			self.gO.yourTurn = false;
			self.gO.simonsTurn = true;


			self.isDisabled = true; //shows button
			self.startBtn = true; //hides btn

			self.random = self.gO.random[Math.floor(Math.random() * self.gO.random.length)];

			$log.info('Simon selected: ' + self.random);
			
			self.gO.simonMoves.push({move: self.random});

			self.len = self.gO.simonMoves.length;

			var x = 0; // Resets Every time simon takes a turn

			$interval(function(){

				// Runs through simons choices
				if (self.gO.simonMoves[x].move == 'yellow') {

					self.selectSquare(self.gO.colorOptions.yellow);

				} else if (self.gO.simonMoves[x].move == 'green') {

					self.selectSquare(self.gO.colorOptions.green);

				} else if (self.gO.simonMoves[x].move == 'blue') {

					self.selectSquare(self.gO.colorOptions.blue);

				} else if (self.gO.simonMoves[x].move == 'red') {

					self.selectSquare(self.gO.colorOptions.red);

				} else {
					$log.log('Oops... Simon Fucked Up!')
				}

				if (x === self.len - 1) {

					$timeout(function(){
					  self.isDisabled = false;
				    }, 10);

					$timeout(function(){
				    	self.gO.simonsTurn = false;
						self.gO.yourTurn = true;
					}, 1000);
					
				}

				x++;

			}, 800, self.len);

		}

		//animation for color selection
		self.selectSquare = function(color) {
			if (color === 'yellow') {

				self.yellow = true;

			} else if (color === 'green') {

				self.green = true;	

			} else if (color === 'blue') {

				self.blue = true;

			} else if (color === 'red') {

				self.red = true;	

			} 
			$timeout(function(){
					self.yellow = false;
					self.red = false;
					self.blue = false;
					self.green = false;
				}, 200);
		}
		
	}); //close ctrl