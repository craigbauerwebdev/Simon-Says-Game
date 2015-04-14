angular.module('simonSaysApp', [])


	.factory('simonsTurn', function(){

		function simonsTurn() {

		}

		simonsTurn.prototype.hisTurn = function(service) {
			// body...
		};
			
			return simonsTurn;
		})


	.service('allOptions', function(){

	})

	.value('colors', function(){

	})

	.controller('control', function($timeout, $interval, $log, simonsTurn, allOptions, colors){

		var self = this;
		self.isDisabled = true;


// move values into this object slowly
		self.gameOptions = {
			colorOptions: {
				yellow: 'yellow', 
				green: 'green', 
				blue: 'blue', 
				red: 'red',
				random: ['yellow', 'green', 'blue', 'red']
				},
			simonsTurn: false,
			yourTurn: false,
			simonMoves: [],
			yourMoves: [],
			displaySimon: [],
			displayHuman: []

		}
// end object

		self.colorOptions = ['yellow', 'green', 'blue', 'red'];

		var i = 0;

		self.yourTurn = function(colorSelect) {

			//run animation function on usr click
			self.clickedColor = colorSelect;
			self.selectSquare(self.clickedColor);

			self.gameOptions.yourMoves.push({move: self.clickedColor});

			if ( self.gameOptions.yourMoves[i].move === self.gameOptions.simonMoves[i].move ) {

				//$log.log('selection matched');
				i++;

				if ( self.gameOptions.yourMoves.length === self.gameOptions.simonMoves.length) {
					
					//$log.log('New Round');	
					self.gameOptions.yourMoves = [];
					self.simonsTurn();
					i = 0;
				}	

			} else {

				i = 0;
				self.gameOptions.yourMoves = [];
				self.gameOptions.simonMoves = [];
				self.gameOptions.yourTurn = false;
				self.gameOptions.simonsTurn = false;
				self.isDisabled = true;
				self.startBtn = false; //shows play again btn

				console.log('Play Again?');
			}

		}


		self.simonsTurn = function(){

			self.gameOptions.yourTurn = false;
			self.gameOptions.simonsTurn = true;


			self.isDisabled = true; //shows button
			self.startBtn = true; //hides btn

			self.random = self.colorOptions[Math.floor(Math.random() * self.colorOptions.length)];

			$log.info('Simon selected: ' + self.random);
			
			self.gameOptions.simonMoves.push({move: self.random});

			self.len = self.gameOptions.simonMoves.length;

			var x = 0; // Resets Every time simon takes a turn

			$interval(function(){

				// Runs through simons choices
				if (self.gameOptions.simonMoves[x].move == 'yellow') {

					self.selectSquare(self.gameOptions.colorOptions.yellow);

				} else if (self.gameOptions.simonMoves[x].move == 'green') {

					self.selectSquare(self.gameOptions.colorOptions.green);

				} else if (self.gameOptions.simonMoves[x].move == 'blue') {

					self.selectSquare(self.gameOptions.colorOptions.blue);

				} else if (self.gameOptions.simonMoves[x].move == 'red') {

					self.selectSquare(self.gameOptions.colorOptions.red);

				} else {
					$log.log('Oops... Simon Fucked Up!')
				}

				if (x === self.len - 1) {

					$timeout(function(){
					  self.isDisabled = false;
				    }, 10);

					$timeout(function(){
				    	self.gameOptions.simonsTurn = false;
						self.gameOptions.yourTurn = true;
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