clickABand.controller('StatsController', ['$scope', 'gameService',
    function ($scope, gameService) {
        $scope.clickRecord = function () {
            gameService.clickRecord();
        };

        $scope.notesTotal = 0;
        $scope.notesPerClick = 1;
        $scope.notesPerHour = 0;
        $scope.notesInterval = 'Stunde';

        $scope.$on('recordClicked', function (e) {
            updateNotesTotal();
        });

        var updateNotesTotal = function () {
            $scope.notesTotal = gameService.getNotesTotal();
        }
    }
]);

clickABand.controller('SongController', ['$scope', 'gameService',
    function ($scope, gameService) {
        $scope.songOn = false;
        $scope.title = 'Songs';
        $scope.effect = 'Effekt';
        $scope.cost = 'Kosten';

        $scope.songs = [
            {
                'title': 'Cover Songs',
                'effect': '1',
                'cost': '10'
            }
        ];

        $scope.buy = function (song) {
            gameService.pay(song.cost);
        };

        $scope.$on('recordClicked', function () {
            if (gameService.getNotesTotal() >= 10) {
                $scope.songOn = true
            }
        });

    }
]);