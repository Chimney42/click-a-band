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
        return this.notesTotal;
    };

    GameService.prototype.clickRecord = function() {
        this.notesTotal += this.notesPerClick;
        $rootScope.$broadcast('notesChanged');
        return this.notesTotal;
    };

    GameService.prototype.pay = function(cost) {
        if(this.notesTotal >= cost) {
            this.notesTotal -= cost;
            $rootScope.$broadcast('notesChanged');
            return true;
        }
        return false;
    };

    GameService.prototype.setNewClickEffect = function(effect, owned) {
        this.clickEffect = effect;
        this.clickOwned = owned;
        $rootScope.$broadcast('notesChanged');
    }

    return new GameService();
}]);
