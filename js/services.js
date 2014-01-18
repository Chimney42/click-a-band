var clickABand = angular.module('clickABand', []);

clickABand.factory('gameService', ['$rootScope', '$interval',
    function ($rootScope, $interval) {
        var GameService = function () {
            this.notesTotal = 0;
            this.notesPerClick = 1;
            this.clickEffect = 0;
            this.clickOwned = 0;

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
        };

        GameService.prototype.calculateNotesPerClick = function () {
            return this.notesPerClick + this.clickEffect * this.clickOwned;
        };

        GameService.prototype.getNotesTotal = function () {
            return this.round(this.notesTotal);
        };

        GameService.prototype.clickRecord = function () {
            this.notesTotal += this.calculateNotesPerClick();
            $rootScope.$broadcast('notesChanged');
            return this.notesTotal;
        };

        GameService.prototype.buySong = function (song) {
            if (this.notesTotal >= song.cost) {
                this.notesTotal -= song.cost;
                song.cost = this.round(song.cost + song.cost * 0.1);
                song.owned++;
                if ('Cover Songs' === song.title) {
                    this.clickEffect = song.effect;
                    this.clickOwned = song.owned;
                } else {
                    this.addPerHourEffect(song);
                }

                var self = this;
                $interval(function () {
                    self.addNotesPerSecond();
                }, 1000);

                $rootScope.$broadcast('notesChanged');
            }
        };

        GameService.prototype.round = function (number) {
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
                notesPerInterval += ('Sekunde: ' + this.round(notesPerHour / 3600));
            } else if (notesPerHour >= 60) {
                notesPerInterval += ('Minute: ' + this.round(notesPerHour / 60));
            } else {
                notesPerInterval += ('Stunde: ' + this.round(notesPerHour));
            }
            return notesPerInterval;
        };

        GameService.prototype.addNotesPerSecond = function () {
            this.notesTotal += (this.calculateNotesPerHour() / 3600);
            $rootScope.$broadcast('notesChanged');
        };

        return new GameService();
    }
]);
