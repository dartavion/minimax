/* jshint -W079 */
(function () {
    'use strict';

    angular
        .module('app.board')
        .controller('BoardController', BoardController);

    BoardController.$inject = ['dataservice'];

    function BoardController(dataservice) {
        var vm = this;

        vm.squares = 0;

        activate();

        function activate() {
            dataservice
                .getList()
                .then(function (data) {
                    console.log(data.length);
                    vm.squares = data || [];
                });
        }

    }
})();
