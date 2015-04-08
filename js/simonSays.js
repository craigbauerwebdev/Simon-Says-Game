angular.module('simonSaysApp', [])


	.factory('fact', function(){

			//Logic
			self.btn = {
				color: 'red'
			}

			return btn.color;//something;
		})


	.service('calc', function(){

		})

	.value('val', function(){

		})

	.controller('control', function($timeout, $interval, $log, fact){

		var self = this;
		var speed = 100;

		self.colorOptions = ['yellow', 'green', 'blue', 'red'];
		self.simonMoves = [];
		self.yourMoves = [];


		self.colors = {
			yellow: '_yellow_',
			green: '_green_',
			blue: '_blue_',
			red: '_red_'
		}

		self.simonsTurn = function(){
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
				if (x === self.len) {
					console.log('Your Turn');
				}
				x++;
			}, 1000, self.len);

			console.log('Your Turn');
		}

		//animation for color selection
		self.selectSquare = function(color) {
			if (color === self.colors.yellow) {
				self.yellow = true;

				$timeout(function(){
					self.yellow = false;
				}, speed);

				//console.log('yellow');

			} else if (color === self.colors.green) {

				self.green = true;

				$timeout(function(){
					self.green = false;
				}, speed);

				//console.log('green');

			} else if (color === self.colors.blue) {
				self.blue = true;

				$timeout(function(){
					self.blue = false;
				}, speed);

				//console.log('blue');

			} else if (color === self.colors.red) {
				self.red = true;

				$timeout(function(){
					self.red = false;
				}, speed);

				//console.log('red');
			} else {
				console.log('No Color Logged');
			}
			
			//console.log('Ran Function');
		}
		
	}); //close ctrl