clickABand.controller('StatsController', ['$scope', 'gameService',
    function ($scope, gameService) {
        $scope.clickRecord = function() {
            gameService.clickRecord();
        };

        $scope.notesTotal = 0;
        $scope.notesPerClick = 1;
        $scope.notesPerHour = 0;
        $scope.notesInterval = 'Stunde';

        $scope.$on('notesChanged', function(e) {
            updateNotes();
        });

        var updateNotes = function() {
            $scope.notesTotal = gameService.getNotesTotal();
            $scope.notesPerClick = gameService.calculateNotesPerClick();
        }
    }
]);

clickABand.controller('SongController', ['$scope', 'gameService',
    function($scope, gameService) {
        $scope.songOn = false;
        $scope.title = 'Songs';
        $scope.effect = 'Effekt';
        $scope.cost = 'Kosten';
        $scope.owned = 'In Besitz';

        $scope.songs = [
            {
                'title': 'Cover Songs',
                'effect': 1,
                'effectUnit': 'Klick',
                'cost': 10,
                'owned': 0,
                'on': false
            },
            {
                'title': 'Eigene Songs',
                'effect': 1,
                'effectUnit': 'Stunde',
                'cost': 100,
                'owned': 0,
                'on': false
            },
            {
                'title': 'Lokaler Hit',
                'effect': 1,
                'effectUnit': 'Minute',
                'cost': 1000,
                'owned': 0,
                'on': false
            },
            {
                'title': 'Nationaler Hit',
                'effect': 1,
                'effectUnit': 'Sekunde',
                'cost': 10000,
                'owned': 0,
                'on': false
            },
            {
                'title': 'Welthit',
                'effect': '60',
                'effectUnit': 'Sekunde',
                'cost': 100000,
                'owned': 0,
                'on': false
            }
        ];

        $scope.buy = function (song) {
           gameService.buy(song)

        };

        $scope.isOn = function(song) {
            return song.on;
        }

        $scope.$on('notesChanged', function () {
            $scope.songs.forEach(function(song) {
                if(gameService.getNotesTotal() >= song.cost) {
                    $scope.songOn = true;
                    song.on = true;
                }
            })
        });

    }
]);