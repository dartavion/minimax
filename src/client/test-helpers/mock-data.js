/* jshint -W079 */
var mockData = (function() {
    return {
        getList: getList
    };

    function getList () {
        console.log('this get called');
        return [
            {
                'id': 1
            },
            {
                'id': 2
            },
            {
                'id': 3
            },
            {
                'id': 4
            },
            {
                'id': 5
            },
            {
                'id': 6
            },
            {
                'id': 7
            },
            {
                'id': 8
            },
            {
                'id': 9
            }
        ];
    }

})();
