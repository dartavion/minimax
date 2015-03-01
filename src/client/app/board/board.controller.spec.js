/* jshint -W117, -W030 */
describe('BoardController', function () {
    var controller,
        board = mockData.getMockBoard();

    console.log('board', board);
    beforeEach(function () {
        bard.appModule('app.board');
        bard.inject('$controller', '$log', '$rootScope', '$q', 'dataservice');
    });

    beforeEach(function () {
        sinon.stub(dataservice, 'getList')
            .returns($q.when(mockData.blackWidow));
        controller = $controller('BoardController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Board controller', function () {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function () {
            it('has 3 groups of 3 squares', function () {
                expect(controller.squares.length).to.equal(9);
            });
        });
    });
});
