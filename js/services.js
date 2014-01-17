var clickABand = angular.module('clickABand', []);

clickABand.factory('gameService', ['$rootScope', function($rootScope) {
    var GameService = function () {
        this.notesTotal = 0;
        this.notesPerClick = 1;
    };

    GameService.prototype.getNotesTotal = function() {
        return this.notesTotal;
    };

    GameService.prototype.clickRecord = function() {
        this.notesTotal += this.notesPerClick;
        $rootScope.$broadcast('recordClicked');
        return this.notesTotal;
    };

    GameService.prototype.pay = function(cost) {
        if(this.notesTotal >= cost) {
            this.notesTotal -= cost;
            $rootScope.$broadcast('recordClicked')
        }
    };

    return new GameService();
}]);