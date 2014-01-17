var clickABand = angular.module('clickABand', []);
 
clickABand.factory('gameService', function() {
//Konstruktorfunktion für GameService Objekte
 var GameService = function() {
     //Instanzproperties
  this.notesTotal = 0;
  this.notesPerClick = 1;
  this.notesPerHour = 0;
  this.songOn = false;
 };
    //Methoden auf dem "prototype" definiert, so dass diese nicht für jede Instanz kopiert werden, sondern nur einen Scope belegen -> prototype Scope des Gameservice
  GameService.prototype.getTotalNotes = function() {
   return this.notesTotal;
  }

  GameService.prototype.getTotalNotesgetNotesPerClick = function() {
   return this.notesPerClick;
  }

  GameService.prototype.getNotesPerHour = function() {
   return this.notesPerHour;
  }

  GameService.prototype.clickRecord = function() {
   this.notesTotal += notesPerClick;
   return this.notesTotal;
  }
    //Neue Instanz zurückgeben
 return new GameService();
});