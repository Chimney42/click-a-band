var clickABand = angular.module('clickABand', []);

clickABand.factory('gameService', ['$rootScope', function($rootScope) {
    var GameService = function () {
        this.notesTotal = 0;
        this.notesPerClick = 1;
        this.clickEffect = 0;
        this.clickOwned = 0;
    };

    GameService.prototype.calculateNotesPerClick = function() {
        return this.notesPerClick + this.clickEffect * this.clickOwned;
    }

    GameService.prototype.getNotesTotal = function() {
        return this.round(this.notesTotal);
    };

    GameService.prototype.clickRecord = function() {
        this.notesTotal += this.calculateNotesPerClick();
        $rootScope.$broadcast('notesChanged');
        return this.notesTotal;
    };

    GameService.prototype.buy = function(song) {
        if(this.notesTotal >= song.cost) {
            this.notesTotal -= song.cost;
            song.cost = this.round(song.cost + song.cost*0.1);
            song.owned++;
            if('Cover Songs' === song.title) {
                this.clickEffect = song.effect;
                this.clickOwned = song.owned
            } else {

            }
            $rootScope.$broadcast('notesChanged');
        }
    };

    GameService.prototype.round = function(number) {
        return Math.round(number * 100) / 100;
    }
    return new GameService();
}]);
