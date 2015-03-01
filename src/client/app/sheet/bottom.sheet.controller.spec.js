/* global describe:false */
/* global expect:false */
describe('Bottom Sheet', function () {
    var controller;

    beforeEach(function () {
        bard.appModule('app.board');
        bard.inject('$controller');
    });

    beforeEach(function () {
        controller = $controller('BottomSheet')
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Controller', function () {
       it('should exist', function () {
           expect(controller).to.be.defined;
       });
    });
});
