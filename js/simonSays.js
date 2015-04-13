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

	.value('val', function(){

		})

	.controller('control', function($timeout, $interval, $log, simonsTurn){

		var self = this;
		var speed = 100;
		self.isDisabled = true;

		self.colorOptions = ['yellow', 'green', 'blue', 'red'];
		self.simonMoves = [];
		self.yourMoves = [];


		//for clicks
		self.colors = {
			yellow: '_yellow_',
			green: '_green_',
			blue: '_blue_',
			red: '_red_'
		}

		self.simonsTurn();

		self.i = 0;

		self.yourTurn = function(colorSelect) {
			$log.info('Ran Your Turn Function');
			//run animation function on usr click
			self.selectSquare(colorSelect);

			//push selection to yourMoves
			self.yourMoves.push({move: colorSelect});

			if (self.simonMoves[i].move === self.yourMoves[i].move) {

				i++;

			} else {

				return;
				//end = self.simonMoves[i].length;
			}

			if (i = self.simonMoves[i].length+1){
				self.simonsTurn();
			}



			$log.info(self.yourMoves);

			//compare index of arrays

			//end if array is over

			/*$timeout(function(){
				self.isDisabled = false;
			}, 5000)*/
			
		}

		self.simonsTurn = function(){
			self.isDisabled = true;
			//get random color
			self.random = self.colorOptions[Math.floor(Math.random() * self.colorOptions.length)];
			//Log the color
			$log.info('Simon selected: ' + self.random);
			//Push Color to the Simon Array
			self.simonMoves.push({move: self.random});

			self.len = self.simonMoves.length;

			$log.info('Length of array: ' + self.len);

			
			var x = 0;

			$interval(function(){

				console.log(self.simonMoves[x]);

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

				//log
				console.log('x: ' + x);
				console.log('Len: ' + self.len)

				if (x === self.len - 1) {

					// Enable Buttons after 1 sec
					$timeout(function(){
					  self.isDisabled = false;
				    },1000);

					//self.yourTurn();

					
				}
				x++;
			}, 1000, self.len);

			//console.log('Your Turn');
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