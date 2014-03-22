describe('drag directive', function () {

  var element, scope, $document;

  beforeEach(module('dragAndDrop'));

  beforeEach(inject(function ($compile, $rootScope, _$document_) {
    var linkingFn;
    $document = _$document_;
    linkingFn = $compile('<div drag></div>');
    scope = $rootScope;
    element = linkingFn(scope);
  }));

  it('has draggable attribute set to true (string)', function () {
    expect(element.attr('draggable')).toBe('true');
  });

  describe('dragstart', function () {

    it('classes are added', function () {

      element.triggerHandler('dragstart');
      expect(element.hasClass('dnd-dragging')).toBeTruthy();
      expect($document.find('body').hasClass('dnd-dragging-item')).toBeTruthy();
    });

    it('calls method on scope', function () {
      // inject attributes
      inject(function ($compile, $rootScope) {
        var linkingFn = $compile('<div drag="{start: \'onStart\'}"></div>');
        scope = $rootScope;
        element = linkingFn(scope);
      });

      scope.onStart = jasmine.createSpy('onStart');

      element.triggerHandler('dragstart');
      expect(scope.onStart).toHaveBeenCalled();
    });
  });

  describe('drag', function () {

    it('calls method on scope', function () {
      // inject attributes
      inject(function ($compile, $rootScope) {
        var linkingFn = $compile('<div drag="{start: \'onStart\', drag: \'onDrag\', end: \'onEnd\'}"></div>');
        scope = $rootScope;
        element = linkingFn(scope);
      });

      scope.onDrag = jasmine.createSpy('onDrag');

      element.triggerHandler('drag');
      expect(scope.onDrag).toHaveBeenCalled();
    });

  });

  describe('dragend', function () {

    it('classes are removed', function () {

      // set classes
      var body = $document.find('body');
      element.addClass('dnd-dragging');
      body.addClass('dnd-dragging-item');

      // trigger event
      element.triggerHandler('dragend');

      // expects
      expect(element.hasClass('dnd-dragging')).toBeFalsy();
      expect($document.find('body').hasClass('dnd-dragging-item')).toBeFalsy();
    });

    it('calls method on scope', function () {
      // inject attributes
      inject(function ($compile, $rootScope) {
        var linkingFn = $compile('<div drag="{start: \'onStart\', end: \'onEnd\'}"></div>');
        scope = $rootScope;
        element = linkingFn(scope);
      });

      scope.onEnd = jasmine.createSpy('onEnd');

      element.triggerHandler('dragend');
      expect(scope.onEnd).toHaveBeenCalled();
    });
  });

});
