/* jshint -W117, -W030 */
describe('board', function() {
    describe('state', function() {
        var controller;
        var view = 'app/board/board.html';

        beforeEach(function() {
            module('app.board', bard.fakeToastr);
            bard.inject('$location', '$rootScope', '$state', '$templateCache');
            $templateCache.put(view, '');
        });

        it('should map / route to board View template', function() {
            expect($state.get('board').templateUrl).to.equal(view);
        });

        it('should map state board to url / ', function() {
            expect($state.href('board', {})).to.equal('/');
        });

        it('of board should work with $state.go', function() {
            $state.go('board');
            $rootScope.$apply();
            expect($state.is('board'));
        });
    });
});
