module.exports = function(app) {
    var api = '/api';
    var data = '/../data/';
    var jsonfileservice = require('../utils/json')();
    var Game = require('./Game');
    var tictactoe = new Game();

    app.get(api + '/board/', getBoard);
    app.post(api + '/board/', setMove);

    function getBoard(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'squares.json');
        return res.status(200).json(json);
    }

    function setMove(req, res, next) {
        var move;

        if (req.query.one && req.query.two && !tictactoe.is_terminal()) {
            tictactoe.make_player_move(req.query.one, req.query.two);
            move = tictactoe.make_ai_move();
            return res.status(200).json(move);
        } else {
            return res.status(200).json({gameover: true});
        }
    }
};

