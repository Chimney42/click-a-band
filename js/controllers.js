clickABand.controller('StatsController', ['$scope', 'gameService',
    function ($scope, gameService) {
        $scope.clickRecord = function () {
            gameService.clickRecord();
        };

        $scope.notesTotal = 0;
        $scope.notesPerClick = 1;
        $scope.notesPerHour = 0;
        $scope.notesInterval = 'Stunde';

        $scope.$on('notesChanged', function (e) {
            updateNotes();
        });

        var updateNotes = function () {
            $scope.notesTotal = gameService.getNotesTotal();
            $scope.notesPerClick = gameService.calculateNotesPerClick();
        }
    }
]);

clickABand.controller('SongController', ['$scope', 'gameService',
    function ($scope, gameService) {
        $scope.songOn = false;
        $scope.title = 'Songs';
        $scope.effect = 'Effekt';
        $scope.cost = 'Kosten';
        $scope.owned = 'In Besitz';

        $scope.songs = [
            {
                'title': 'Cover Songs',
                'effect': '1',
                'cost': '10',
                'owned': '0'
            }
        ];

        $scope.buy = function (song) {
            if(gameService.pay(song.cost)) {
                if('Cover Songs' === song.title) {
                    song.owned++;
                    gameService.setNewClickEffect(song.effect, song.owned);
                }
            }
        };

        $scope.$on('notesChanged', function () {
            if (gameService.getNotesTotal() >= 10) {
                $scope.songOn = true
            }
        });

    }
]);