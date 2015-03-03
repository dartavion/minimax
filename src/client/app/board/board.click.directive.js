(function () {
    'use strict';

    angular
        .module('app.board')
        .directive('boardClick', boardClick);

    boardClick.$inject = ['BottomSheetService'];

    function boardClick(BottomSheetService) {
        function linker(scope, element, attr) {
            return element.bind(attr.boardClick, function(e) {
                if (scope.gameover) {
                    BottomSheetService.show();
                    return e.stopPropagation();
                }
            });
        }

        return {
            restrict: 'A',
            link: linker,
            gameover: '='
        };
    }
})();
