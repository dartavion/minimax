/* jshint -W117, -W030 */
describe('BoardController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.board');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('BoardController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Board controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });
    });
});
