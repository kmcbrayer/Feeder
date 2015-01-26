'use strict';

angular.module('feederApp')
  .directive('touchSlideController', ['$swipe', 'pageSet', function($swipe, pageSet) {
    return {
      restrict: 'A',
      link: function(scope,ele,attrs,ctrl) {
        var startx, delta;
        $swipe.bind(ele, {
          'start': function(coords) {
            startx = coords.x;
          },
          'move': function(coords) {
            delta = coords.x - startx;
            ele.css('left',delta);
            if (delta < -100) {
              scope.$parent.$parent.pageTurnRight();
            }
            //start timer
            //slow move: activate pageTurn when position is x = 100?px from edge
              //if left edge pageTurnRight:
              //if right edge pageTurnLeft:
            //fast move: activate pageTurn when delta/t > x = find natural acceleration
              //if delta>0: pageTurnRight
              //if delta<0: pageTurnLeft
            //delete timer
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
