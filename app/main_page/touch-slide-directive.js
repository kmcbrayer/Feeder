'use strict';

angular.module('feederApp')
  .directive('touchSlideController', ['$swipe', 'pageSet', function($swipe, pageSet) {
    return {
      restrict: 'A',
      link: function(scope,ele,attrs,ctrl) {
        var startx, delta;
        var enabled = true;
        $swipe.bind(ele, {
          'start': function(coords) {
            enabled = true;
            startx = coords.x;
          },
          'move': function(coords) {
            delta = coords.x - startx;
            if (enabled) {
              ele.css('left',delta);
              if (delta < -100) {
                enabled = false;
                scope.pageTurnRight();
              }
              if (delta > 100) {
                enabled = false;
                scope.pageTurnLeft();
              }
            }
          },
          'end': function(coords) {
            ele.animate({left: 0},400,'swing');
          },
          'cancel': function(coords) {
            // same as 'end'
          }
        });
      }
    }
  }]);
