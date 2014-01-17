var clickABand = angular.module('clickABand', []);
 
clickABand.factory('gameService', ['$rootScope', function($rootScope) {
 var GameService = function() {
  this.notesTotal = 0;
  this.notesPerClick = 1;
  this.notesPerHour = 0;
  this.songOn = false;
 };

 GameService.prototype.getNotesTotal = function() {
   return this.notesTotal;
  }

  GameService.prototype.getNotesPerClick = function() {
   return this.notesPerClick;
  }

  GameService.prototype.getNotesPerHour = function() {
   return this.notesPerHour;
  }

  GameService.prototype.clickRecord = function() {
   this.notesTotal += this.notesPerClick;
   $rootScope.$broadcast('recordClicked');
   return this.notesTotal;
  }
 
 return new GameService();
}]);