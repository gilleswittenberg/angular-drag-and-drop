describe('drop directive', function () {

  var element, scope;

  beforeEach(module('dragAndDrop'));

  beforeEach(inject(function ($compile, $rootScope) {
    var linkingFn = $compile('<div drop="{enter: \'onEnter\', leave: \'onLeave\', over:\'onOver\', drop:\'onDrop\'}"></div>');
    scope = $rootScope;
    element = linkingFn(scope);
  }));

  describe('dragenter', function () {

    it('has class', function () {

      element.triggerHandler('dragenter');
      expect(element.hasClass('dnd-over')).toBeTruthy();
    });

    it('calls method on scope', function () {

      scope.onEnter = jasmine.createSpy('onEnter');

      element.triggerHandler('dragenter');
      expect(scope.onEnter).toHaveBeenCalled();
    });
  });

  describe('dragleave', function () {

    it('has class removed', function () {

      element.addClass('dnd-over');
      element.triggerHandler('dragleave');
      expect(element.hasClass('dnd-over')).toBeFalsy();
    });

    it('calls method on scope', function () {

      scope.onLeave = jasmine.createSpy('onLeave');

      element.triggerHandler('dragleave');
      expect(scope.onLeave).toHaveBeenCalled();
    });

  });

  describe('dragover', function () {

    it('calls method on scope', function () {
      scope.onOver = jasmine.createSpy('onOver');

      element.triggerHandler('dragover');
      expect(scope.onOver).toHaveBeenCalled();
    });
  });

  describe('drop', function () {

    it('calls method on scope', function () {
      scope.onDrop = jasmine.createSpy('onDrop');

      element.triggerHandler('drop');
      expect(scope.onDrop).toHaveBeenCalled();
    });
  });

});
