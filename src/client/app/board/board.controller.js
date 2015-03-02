/* jshint -W079 */
(function () {
    'use strict';

    angular
        .module('app.board')
        .controller('BoardController', BoardController);

    BoardController.$inject = ['dataservice', '$q', 'logger',
        '$rootScope', 'BottomSheetService', '$timeout'];

    function BoardController(dataservice, $q, logger, $rootScope, BottomSheetService, $timeout) {
        var vm = this,
            i = 0,
            currentPlayer = true;

        vm.squares = [];
        vm.onCommitSelection = onCommitSelection;

        $rootScope.$on('begin.game', beginGame);

        activate();

        function activate() {
            var promises = [refreshBoard()];
            return $q.all(promises)
                .then(function() {
                    logger.info('Activated board View');
                });
        }

        function refreshBoard () {
            return dataservice
                .getList()
                .then(function (data) {
                    vm.squares = data || [];
                });
        }

        function beginGame () {
            console.log('beginning game');
            refreshBoard();
        }

        function markInactive(selection) {
            var i, j;
            for (i = 0; i < vm.squares.length; i += 1) {
                for (j = 0; j < vm.squares[i].length; j += 1) {
                    if (selection === vm.squares[i][j].name) {
                        vm.squares[i][j]['active'] = false;
                    }
                }
            }
        }

        function nextMove(move) {
            var opponent,
                id = 'a' + move[0] + '' + move[1];
            opponent = document.querySelector('#' + id);
            $timeout(function () {
                angular.element(opponent).click();
            }, 2000);
        }

        function sendChoice(choice) {
            var position = {one: choice[0], two: choice[1]};
            return dataservice
                .post('board', position)
                .then(function (data) {
                    if (!data.gameover) {
                        nextMove(data);
                    } else {
                        openBottomSheet();
                        // send server message to start new game
                    }
                });
        }

        function onCommitSelection(square, event, indexes, index) {
            var selection = {};

            markInactive(index);

            if (getPlayer()) {
                selection['x'] = square;
                angular.element(event.currentTarget).addClass('x-square');
                angular.element(event.currentTarget).off();

            } else {
                selection['o'] = square;
                angular.element(event.currentTarget).addClass('o-square');
                angular.element(event.currentTarget).off();
                sendChoice(indexes);
            }
            increment();
        }

        function getPlayer() {
            return (currentPlayer = !currentPlayer);
        }

        function increment () {
            if (i >= 8) {
                openBottomSheet();
            }
            i++;
        }

        function openBottomSheet() {
            BottomSheetService.showBottomSheet();
        }
    }
})();
