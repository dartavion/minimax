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
            gameover = false,
            i = 0,
            currentPlayer = true;

        vm.squares = [];
        vm.onCommitSelection = onCommitSelection;
        vm.gameover = gameover;

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
            i = 0;
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
            }, 300);
        }

        function reset() {
            $timeout(function () {
                refreshBoard();
            }, 2000);
            currentPlayer = true;
            gameover = false;
        }

        function sendChoice(choice) {
            var position = {one: choice[0], two: choice[1]};
            return dataservice
                .post('board', position)
                .then(function (data) {
                    if (!data.gameover) {
                        nextMove(data.move);
                    } else {
                        if (data.move === undefined) {
                            reset();
                            return;
                        }
                        nextMove(data.move);
                        openBottomSheet();
                        logger.info('Game over!!!');
                        $timeout(function () {
                            refreshBoard();
                        }, 2000);
                    }
                });
        }

        function addPlayerChoice(event, piece) {
            angular.element(event.currentTarget).addClass(piece);
            angular.element(event.currentTarget).off();
        }

        function onCommitSelection(square, event, indexes, index) {
            markInactive(index);

            if (getPlayer()) {
                addPlayerChoice(event, 'x-square');
            } else {
                addPlayerChoice(event, 'o-square');
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
