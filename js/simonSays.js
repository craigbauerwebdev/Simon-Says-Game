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
			colorOptions: [
				{ color: 'yellow' }, 
				{ color: 'green' }, 
				{ color: 'blue' }, 
				{ color: 'red' }
			],
			simonMoves: [],
			yourMoves: [],
			displaySimon: [],
			displayHuman: []

		}
// end object

		self.colorOptions = ['yellow', 'green', 'blue', 'red'];
		self.simonMoves = [];
		self.yourMoves = [];

		self.displaySimon = [];
		self.displayHuman = [];


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
			self.clickedColor = colorSelect;
			self.selectSquare(self.clickedColor);

			self.yourMoves.push({move: self.clickedColor});

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

			self.random = self.colorOptions[Math.floor(Math.random() * self.colorOptions.length)];

			$log.info('Simon selected: ' + self.random);
			
			self.simonMoves.push({move: self.random});

			self.len = self.simonMoves.length;

			var x = 0; // Resets Every time simaon takes a turn

			$interval(function(){

				// Runs through simons choices
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
				}, 200);
		}
		
	}); //close ctrl