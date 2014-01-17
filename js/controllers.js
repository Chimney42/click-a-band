var clickABand = angular.module('clickABand', ['gameService']);

clickABand.controller('StatsController', function($scope, gameService) {
    $scope.clickRecord = function() {
        gameService.clickRecord();
    }
});

clickABand.controller('SongController', function($scope, $rootScope) {
    $scope.title = 'Songs';
    $scope.songs = [
        {
            'title': 'Cover Songs',
            'effect': '1',
            'cost': '10'
        }
    ];
    $scope.buy = function(song) {
        console.log(arguments)
    }
    $scope.isOn = function() {
        return !!$rootScope.songOn;
    }
});