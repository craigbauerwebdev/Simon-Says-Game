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

		.controller('control', function($timeout, fact){

		var self = this;
		var speed = 200;


		self.simonMoves = [];
		self.yourMoves = [];


// Combine into 1 function

		self.colors = {
			yellow: '_yellow_',
			green: '_green_',
			blue: '_blue_',
			red: '_red_'
		}

		self.clickSquare = function(color) {
			if (color === '_yellow_') {
				self.yellow = true;

				$timeout(function(){
					self.yellow = false;
				}, 200);

				//console.log('yellow');

			} else if (color === '_green_') {

				self.green = true;

				$timeout(function(){
					self.green = false;
				}, 200);

				//console.log('green');

			} else if (color === '_blue_') {
				self.blue = true;

				$timeout(function(){
					self.blue = false;
				}, 200);

				//console.log('blue');

			} else if (color === '_red_') {
				self.red = true;

				$timeout(function(){
					self.red = false;
				}, 200);

				//console.log('red');
			} else {
				console.log('No Color Logged');
			}

		}
		
		});