(function () {
    'use strict';

    angular
        .module('app.board')
        .controller('BottomSheet', BottomSheet);

    BottomSheet.$inject = ['$rootScope', '$mdBottomSheet'];

    function BottomSheet($rootScope, $mdBottomSheet) {
        var vm = this;

        vm.listItemClick = listItemClick;

        vm.items = [
            {name: 'Play', icon: 'icon-lightning'}
        ];

        function listItemClick($index) {
            var clickedItem = vm.items[$index];
            switch ($index) {
                case 0:
                    $rootScope.$broadcast('begin.game');
                    break;
                case 1:
                    console.log('Show Scores.');
                    break;
                default:
                    console.log('default');
            }
            $mdBottomSheet.hide(clickedItem);
        }
    }

})();
