var clickABand = angular.module('clickABand', []);

clickABand.controller('StatsController', function($scope, $rootScope) {
    $rootScope.notesTotal = 0;
    $rootScope.songOn = false;
    $scope.notesPerClick = 1;
    $scope.notesPerHour = 0;
    $scope.notesInterval = 'Stunde';
    $scope.clickRecord = function() {
        $rootScope.notesTotal = $rootScope.notesTotal + $scope.notesPerClick;
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
        return $rootScope.notesTotal >= 10;
    }
});