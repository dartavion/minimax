module.exports = function(app) {
    var api = '/api';
    var data = '/../data/';
    var jsonfileservice = require('../utils/json')();

    app.get(api + '/board/', getBoard);

    function getBoard(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'squares.json');
        return res.status(200).json(json);
    }
};

