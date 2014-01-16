var clickABand = angular.module('clickABand', []);



clickABand.controller('RecordController', function($scope, $rootScope) {
    $scope.notesTotal = 0;
    $scope.notesPerClick = 1;
    $scope.notesPerHour = 0;
    $scope.notesInterval = 'Stunde';
    $scope.clickRecord = function() {
        $scope.notesTotal = $scope.notesTotal + $scope.notesPerClick;
    }
});

clickABand.controller('SongController', function($scope) {
    $scope.songOn = ''
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
});