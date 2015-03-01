/* jshint -W079 */
(function () {
    'use strict';

    angular
        .module('app.board')
        .controller('BoardController', BoardController);

    BoardController.$inject = ['dataservice', '$q', 'logger', '$rootScope'];

    function BoardController(dataservice, $q, logger, $rootScope) {
        var vm = this;

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

        function onCommitSelection () {
            console.log('commiting selection');
        }
    }
})();
