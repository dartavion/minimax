(function () {
    'use strict';

    angular
        .module('app.board')
        .factory('BottomSheetService', BottomSheetService);

    BottomSheetService.$inject = ['$mdBottomSheet'];

    function BottomSheetService($mdBottomSheet) {
        var vm = this;

        activate();

        return {
            showBottomSheet: showBottomSheet
        };

        function activate() {
            showBottomSheet();
        }

        function showBottomSheet() {
            $mdBottomSheet.show({
                templateUrl: 'app/sheet/bottom.sheet.html',
                controller: 'BottomSheet',
                controllerAs: 'vm'
            });
        }
    }
})();
