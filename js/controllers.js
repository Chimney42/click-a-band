//var clickABand = angular.module('clickABand', ['gameService']);

clickABand.controller('StatsController', ['$scope', 'gameService', 
    function($scope, gameService) {
        $scope.clickRecord = function() {
            gameService.clickRecord();
        }

        $scope.notesTotal = 0;

        $scope.$on('recordClicked', function(e) {
            updateNotesTotal();
        })

        var updateNotesTotal = function() {
            $scope.notesTotal = gameService.getNotesTotal();
        }
    }
]);

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