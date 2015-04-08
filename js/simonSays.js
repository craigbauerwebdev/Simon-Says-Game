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

	.controller('control', function($timeout, $interval, fact){

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
			self.random = self.colorOptions[Math.floor(Math.random() * self.colorOptions.length)];
			
			console.log('Simon selected: ' + self.random);

			self.simonMoves.push({move: self.random});

			console.log(self.simonMoves);
		}
		//self.simonsTurn();

		/*$interval(function(){
			self.selectSquare('_blue_');
		}, 2000);*/

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
		
		});