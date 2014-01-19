var clickABand = angular.module('clickABand', []);

clickABand.factory('gameService', ['$rootScope', '$interval',
    function ($rootScope, $interval) {
        var GameService = function () {
            this.notesTotal = 0;
            this.notesPerClick = 1;
            this.clickEffect = 0;
            this.clickOwned = 0;

            this.researchTypes = ['increaseSongEffect', 'unlock'];

            this.perHourEffects = {
                'effects': [],
                'addEffect': function (song) {
                    var perHourEffect = this.findEffect(song.title);
                    if (perHourEffect) {
                        perHourEffect.owned += 1;
                    } else {
                        this.effects.push({
                            'title': song.title,
                            'effect': song.effect,
                            'unit': song.effectUnit,
                            'owned': song.owned
                        })
                    }
                },
                'findEffect': function (title) {
                    var r = false;
                    this.effects.forEach(function (perHourEffect) {
                        if (perHourEffect.title === title) {
                            r = perHourEffect;
                        }
                    });
                    return r;
                }
            };

            this.increasePerSecond();
        };

        GameService.prototype.increasePerSecond = function() {
            var self = this;
            $interval(function () {
                self.addNotesPerSecond();
            }, 1000);
        }

        GameService.prototype.calculateNotesPerClick = function () {
            return this.roundToDec(this.notesPerClick + this.clickEffect * this.clickOwned);
        };

        GameService.prototype.getNotesTotal = function () {
            return this.roundToDec(this.notesTotal);
        };

        GameService.prototype.clickRecord = function () {
            this.notesTotal += this.calculateNotesPerClick();
            $rootScope.$broadcast('notesChanged');
            return this.notesTotal;
        };

        GameService.prototype.buySong = function (song) {
            if (this.notesTotal >= song.cost) {
                this.notesTotal -= song.cost;
                song.cost = this.roundToDec(song.cost + song.cost * 0.1);
                song.owned++;
                if ('Cover Song' === song.title) {
                    this.clickEffect = song.effect;
                    this.clickOwned = song.owned;
                } else {
                    this.addPerHourEffect(song);
                }
                $rootScope.$broadcast('songBought');
                $rootScope.$broadcast('notesChanged');
            }
        };

        GameService.prototype.roundToDec = function (number) {
            return Math.round(number * 100) / 100;
        };


        GameService.prototype.addPerHourEffect = function (song) {
            this.perHourEffects.addEffect(song);
        };

        GameService.prototype.convertToHour = function (perHourEffect) {
            var toHour;
            switch (perHourEffect.unit) {
                case 'Stunde':
                    toHour = perHourEffect.effect;
                    break;
                case 'Minute':
                    toHour = perHourEffect.effect * 60;
                    break;
                case 'Sekunde':
                    toHour = perHourEffect.effect * 3600;
                    break;
            }
            return toHour;
        };

        GameService.prototype.calculateNotesPerHour = function () {
            var self = this;
            var notesPerHour = 0;
            this.perHourEffects.effects.forEach(function (perHourEffect) {
                notesPerHour += (self.convertToHour(perHourEffect) * perHourEffect.owned);
            });
            return notesPerHour;
        };

        GameService.prototype.getNotesPerInterval = function () {
            var notesPerInterval = '';
            this.calculateNotesPerHour();
            var notesPerHour = this.calculateNotesPerHour();
            if (notesPerHour >= 3600) {
                notesPerInterval += ('Sekunde: ' + this.roundToDec(notesPerHour / 3600));
            } else if (notesPerHour >= 60) {
                notesPerInterval += ('Minute: ' + this.roundToDec(notesPerHour / 60));
            } else {
                notesPerInterval += ('Stunde: ' + this.roundToDec(notesPerHour));
            }
            return notesPerInterval;
        };

        GameService.prototype.addNotesPerSecond = function () {
            this.notesTotal += (this.calculateNotesPerHour() / 3600);
            $rootScope.$broadcast('notesChanged');
        };

        GameService.prototype.buyResearch = function(research) {
            if (this.notesTotal >= research.cost) {
                this.notesTotal -= research.cost;
                switch (research.type) {
                    case (this.researchTypes[0]):
                        research.cost = research.cost * 3;
                        research.owned++;
                        this.increaseSongEffect(research);
                        research.factor += research.factor / 2;
                        break;
                    case (this.researchTypes[1]):
                        this.unlock(research);
                        break;
                }
                $rootScope.$broadcast('notesChanged');
            }
        };

        GameService.prototype.increaseSongEffect = function(research) {
            if ('Cover Song' === research.song) {
                this.clickEffect += this.clickEffect * research.factor;
            } else {
                var perHourEffect = this.perHourEffects.findEffect(research.song);
                if (perHourEffect) {
                    perHourEffect.effect += perHourEffect.effect * research.factor;
                }
            }
            $rootScope.$broadcast('effectChanged', [research.song, research.factor]);
        };

        GameService.prototype.unlock = function(research) {
            $rootScope.$broadcast('unlock', [research.feature])
        };

        return new GameService();
    }
]);
