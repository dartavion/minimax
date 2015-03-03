(function () {
    'use strict';

    angular
        .module('app.board')
        .directive('stopEvent', stopEvent);

    function stopEvent() {
        function linker(scope, element, attr) {
            return element.bind(attr.stopEvent, function(e) {
                return e.stopPropagation();
            });
        }

        return {
            restrict: 'A',
            link: linker
        };
    }
})();
