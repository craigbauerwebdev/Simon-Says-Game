angular.module('simonSaysApp', [])


	.factory('simonsTurn', function(){

		function simonsTurn() {

		}

		simonsTurn.prototype.hisTurn = function(service) {
			// body...
		};
			
			return simonsTurn;
		})


	.service('calc', function(){

	})

	.value('colors', function(){

	})

	.controller('control', function($timeout, $interval, $log, simonsTurn, colors){

		var self = this;
		var speed = 300;
		self.isDisabled = true;

		self.colorOptions = ['yellow', 'green', 'blue', 'red'];
		self.simonMoves = [];
		self.yourMoves = [];


		//for clicks
		self.colors = {
			yellow: 'yellow',
			green: 'green',
			blue: 'blue',
			red: 'red'
		}




		var i = 0;

		self.yourTurn = function(colorSelect) {

			//run animation function on usr click
			self.selectSquare(colorSelect);

			self.yourMoves.push({move: colorSelect});

			if ( self.yourMoves[i].move === self.simonMoves[i].move ) {

				//$log.log('selection matched');
				i++;

				if ( self.yourMoves.length === self.simonMoves.length) {
					
					//$log.log('New Round');	
					self.yourMoves = [];
					self.simonsTurn();
					i = 0;
				}	

			} else {

				i = 0;
				self.yourMoves = [];
				self.simonMoves = [];
				self.isDisabled = true;
				self.startBtn = false; //shows play again btn
				console.log('Play Again?');
			}

			
		}


		self.simonsTurn = function(){

			self.isDisabled = true; //shows button
			self.startBtn = true; //hides btn
			//get random color
			self.random = self.colorOptions[Math.floor(Math.random() * self.colorOptions.length)];
			//Log the color
			$log.info('Simon selected: ' + self.random);
			
			//Push Color to the Simon Array
			self.simonMoves.push({move: self.random});

			self.len = self.simonMoves.length;

			//$log.info('Length of array: ' + self.len);

			
			var x = 0;

			$interval(function(){

				//console.log(self.simonMoves[x]);

				if (self.simonMoves[x].move == 'yellow') {

					self.selectSquare(self.colors.yellow);

				} else if (self.simonMoves[x].move == 'green') {

					self.selectSquare(self.colors.green);

				} else if (self.simonMoves[x].move == 'blue') {

					self.selectSquare(self.colors.blue);

				} else if (self.simonMoves[x].move == 'red') {

					self.selectSquare(self.colors.red);

				} else {
					$log.log('Simon Fucked Up!')
				}

				if (x === self.len - 1) {

					// Enable Buttons after 1/2 sec
					$timeout(function(){
					  self.isDisabled = false;
				    },1);
					
				}
				x++;
			}, 800, self.len);

		}





		//animation for color selection
		self.selectSquare = function(color) {
			if (color === self.colors.yellow) {

				self.yellow = true;

			} else if (color === self.colors.green) {

				self.green = true;	

			} else if (color === self.colors.blue) {

				self.blue = true;

			} else if (color === self.colors.red) {

				self.red = true;	

			} 
			$timeout(function(){
					self.yellow = false;
					self.red = false;
					self.blue = false;
					self.green = false;
				}, speed);
		}
		
	}); //close ctrl