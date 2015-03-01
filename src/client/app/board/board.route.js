(function() {
    'use strict';

    angular
        .module('app.board')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/');
    }

    function getStates() {
        return [
            {
                state: 'board',
                config: {
                    templateUrl: 'app/board/board.html',
                    controller: 'BoardController',
                    controllerAs: 'vm',
                    title: 'board',
                    url: '/'
                }
            }
        ];
    }
})();
