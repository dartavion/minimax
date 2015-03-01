(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['Restangular', '$q'];
    /* @ngInject */
    function dataservice(Restangular, $q) {
        return Restangular.service('api/board');
    }
})();
