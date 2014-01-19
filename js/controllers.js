clickABand.controller('StatsController', ['$scope', 'gameService',
    function ($scope, gameService) {
        $scope.clickRecord = function() {
            gameService.clickRecord();
        };

        $scope.notesTotal = 0;
        $scope.notesPerClick = 1;
        $scope.notesPerInterval = 'Stunde: 0';

        $scope.$on('notesChanged', function(e) {
            updateNotes();
        });

        var updateNotes = function() {
            $scope.notesTotal = gameService.getNotesTotal();
            $scope.notesPerClick = gameService.calculateNotesPerClick();
            $scope.notesPerInterval = gameService.getNotesPerInterval();
        };
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
                'title': 'Cover Song',
                'effect': 1,
                'effectUnit': 'Klick',
                'cost': 10,
                'owned': 0,
                'on': false
            },
            {
                'title': 'Eigener Song',
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

        $scope.buySong = function (song) {
            gameService.buySong(song);
        };

        $scope.isOn = function(song) {
            return song.on;
        };

        $scope.hoverColor = function(song) {
            if (gameService.getNotesTotal() >= song.cost) {
                return 'hoverGreen';
            } else {
                return 'hoverRed';
            }
        }

        $scope.$on('notesChanged', function () {
            $scope.songs.forEach(function(song) {
                if(gameService.getNotesTotal() >= song.cost) {
                    $scope.songOn = true;
                    song.on = true;
                }
            })
        });

        $scope.$on('effectChanged', function(name, args) {
            var song = $scope.findSong(args[0]);
            song.effect = gameService.roundToDec(song.effect + song.effect * args[1]);
        });

        $scope.findSong = function(title) {
            var returnSong = {};
            $scope.songs.forEach(function(song){
                if (title === song.title) {
                    returnSong = song;
                }
            });
            return returnSong;
        };
    }

]);

clickABand.controller('ResearchController', ['$scope', 'gameService',
    function($scope, gameService) {
        $scope.researchOn = false;
        $scope.title = 'Forschung';
        $scope.cost = 'Kosten';
        $scope.effectDesc = 'Beschreibung';

        $scope.researchList = [
            {
                'title': 'Autotune',
                'cost': 50,
                'on': false,
                'type': 'increaseSongEffect',
                'song': 'Cover Song',
                'factor': 0.05,
                'getEffectDesc':  function() {
                    return '+' + gameService.roundToDec(this.factor*100) + '% auf Effekt durch Cover Songs';
                }
            },
            {
                'title': 'Songwriting',
                'cost': 500,
                'on': false,
                'type': 'increaseSongEffect',
                'song': 'Eigener Song',
                'factor': 0.05,
                'getEffectDesc': function() {
                    return '+' + gameService.roundToDec(this.factor*100) + '% auf Effekt durch Eigene Songs'
                }
            },
            {
                'title': 'Lokale Promo',
                'cost': 5000,
                'on': false,
                'type': 'increaseSongEffect',
                'song': 'Lokaler Hit',
                'factor': 0.05,
                'getEffectDesc': function() {
                    return '+' + gameService.roundToDec(this.factor*100) + '% auf Effekt durch Lokale Hits'
                }
            },
            {
                'title': 'Fernsehauftritt',
                'cost': 50000,
                'on': false,
                'type': 'increaseSongEffect',
                'song': 'Nationaler Hit',
                'factor': 0.05,
                'getEffectDesc': function() {
                    return '+' + gameService.roundToDec(this.factor*100) + '% auf Effekt durch Nationale Hits'
                }
            },
            {
                'title': 'Internationaler Festivalgig',
                'cost': 500000,
                'on': false,
                'type': 'increaseSongEffect',
                'song': 'Welthit',
                'factor': 0.05,
                'getEffectDesc': function() {
                    return '+' + gameService.roundToDec(this.factor*100) + '% auf Effekt durch Welthits'
                }
            },
            {
                'title': 'Plattenvertrag',
                'cost': 1000,
                'on': false,
                'type': 'unlock',
                'feature': 'album',
                'getEffectDesc': function() {
                    return 'Schaltet Alben frei'
                }
            }
        ];

        $scope.isOn = function(research) {
            return research.on;
        };

        $scope.$on('notesChanged', function() {
            $scope.researchList.forEach(function(research) {
                if(gameService.getNotesTotal() >= research.cost) {
                    $scope.researchOn = true;
                    research.on = true;
                }
            })
        });

        $scope.buyResearch = function(research) {
            gameService.buyResearch(research);
        }

        $scope.hoverColor = function(research) {
            if (gameService.getNotesTotal() >= research.cost) {
                return 'hoverGreen';
            } else {
                return 'hoverRed';
            }
        };

        $scope.$on('unlock', function(name, args) {
            var i;
            $scope.researchList.forEach(function(research, index) {
                if (research.feature === args[0]) {
                    i = index;
                }
            });
            if (!isNaN(i)) {
                $scope.researchList.splice(i, 1);
            }
        })
    }
]);

clickABand.controller('AlbumController', ['$scope', 'gameService',
    function($scope, gameService) {
        $scope.albumOn = false;
        $scope.title = 'Album';
        $scope.reqSongs = 'Songs benoetigt';
        $scope.cost = 'Kosten';
        $scope.lightbox = {'display': 'none'};
        $scope.buyAlbumOn = false;
        $scope.songs = [];
        $scope.albumTitle = 'Album';
        $scope.albumOwned = 'In Besitz';

        $scope.albums = [
            {
                'title': 'Single',
                'reqSongs': 5,
                'cost': 500
            },
            {
                'title': 'Album',
                'reqSongs': 20,
                'cost': 5000
            }
        ];

        $scope.$on('unlock', function(name, args) {
            if ('album' === args[0]) {
                $scope.albumOn = true;
            }
        });

        $scope.buyAlbum = function(album) {
            $scope.buyAlbumOn = true;
        };

        $scope.$on('songBought', function(name, args) {
            if (gameService.clickOwned > 0) {
                $scope.songs = [{
                    'title': 'Cover Song',
                    'owned': gameService.clickOwned,
                    'count': 0
                }];
            }
            gameService.perHourEffects.effects.forEach(function(effect) {
                $scope.songs.push({
                    'title': effect.title,
                    'owned': effect.owned,
                    'count': 0
                });
            });
        });

        $scope.increaseCount = function(song) {
            if(song.count < song.owned) {
                song.count++;
            }
        };

        $scope.decreaseCount = function(song) {
            if (song.count > 0) {
                song.count--;
            }
        }
    }
]);