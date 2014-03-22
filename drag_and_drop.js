angular.module('dragAndDrop', [])

  // drag directive
  .directive('drag', function ($document, $rootScope) {

    return {

      // restrict to attributes only
      restrict: 'A',

      // directive link function
      link: function ($scope, $elem, $attr) {

        var settings;

        // set draggable attribute to TRUE to make it HTML5 draggable
        $elem.attr('draggable', 'true');

        // get settings of drag attribute
        settings = $scope.$eval($attr.drag) || {};

        // add dragstart listener
        $elem.on('dragstart', function (event) {

          // needed for Firefox (http://stackoverflow.com/questions/3977596/how-to-make-divs-in-html5-draggable-for-firefox)
          if (event && event.dataTransfer && angular.isFunction(event.dataTransfer.setData)) {
            event.dataTransfer.setData(true, true);
          }

          // add element to $rootScope for later reference in drop directive
          $rootScope.dndElem = $elem;
          // add scope to $rootScope for later reference in drop directive
          $rootScope.dndScope = $scope;

          // add class
          $elem.addClass('dnd-dragging');

          // add class to body
          $document.find('body').addClass('dnd-dragging-item');

          // call event handler on scope
          if (settings.start && angular.isFunction($scope[settings.start])) {
            $scope[settings.start](event);
          }
        });

        // add drag listener
        $elem.on('drag', function (event) {

          // call event handler on scope
          if (settings.drag && angular.isFunction($scope[settings.drag])) {
            $scope[settings.drag](event);
          }
        });

        // add dragend listener
        $elem.on('dragend', function (event) {

          // remove class
          $elem.removeClass('dnd-dragging');

          // remove class from body
          $document.find('body').removeClass('dnd-dragging-item');

          // call event handler on scope
          if (settings.end && angular.isFunction($scope[settings.end])) {
            $scope[settings.end](event);
          }
        });

        // add classes
        // droppable
        // multiple directives
        // ??? transclude
        // image replacement for draggable item (e.dataTransfer.setDragImage(img, 0, 0);)
      }
    };
  })

  // drop directive
  .directive('drop', function ($rootScope) {

    return {

      // restrict to attributes only
      restrict: 'A',

      // directive link function
      link: function ($scope, $elem, $attr) {

        var settings;

        // get settings of drop attribute
        settings = $scope.$eval($attr.drop) || {};

        // add dragenter listener
        $elem.on('dragenter', function (event) {

          // add class
          if ($elem !== $rootScope.dndElem) {
            $elem.addClass('dnd-over');
          }

          // call event handler on scope
          if (settings.enter && angular.isFunction($scope[settings.enter])) {
            $scope[settings.enter](event);
          }
        });

        // add dragover listener
        $elem.on('dragover', function (event) {

          // needed to allow a drop
          if ($elem !== $rootScope.dndElem) {
            event.preventDefault();
          }

          // call event handler on scope
          if (settings.over && angular.isFunction($scope[settings.over])) {
            $scope[settings.over](event);
          }
        });

        // add dragleave listener
        $elem.on('dragleave', function (event) {

          // remove class
          $elem.removeClass('dnd-over');

          // call event handler on scope
          if (settings.leave && angular.isFunction($scope[settings.leave])) {
            $scope[settings.leave](event);
          }
        });

        // add drop listener
        $elem.on('drop', function (event) {

          // stops some browsers from redirecting
          if (event.stopPropagation) {
            event.stopPropagation();
          }

          // remove class
          $elem.removeClass('dnd-over');

          // call event handler on scope
          if (settings.drop && angular.isFunction($scope[settings.drop])) {
            $scope[settings.drop](event);
          }

          return false;
        });

      }
    };
  });
