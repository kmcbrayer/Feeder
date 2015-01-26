'use strict';

angular.module('feederApp')
  .directive('touchSlideController', ['$swipe',function($swipe) {
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
            console.log(ele);
            //start timer
            //slow move: activate pageTurn when position is x = 100?px from edge
              //if left edge pageTurnLeft:
              //if right edge pageTurnRight:
            //fast move: activate pageTurn when delta/t > x = find natural acceleration
              //if delta>0: pageTurnRight
              //if delta<0: pageTurnLeft
            //delete timer
          },
          'end': function(coords) {
            // "bounce back" to startx
              //set timer ==.5 seconds
              //move frame like 30-50px per timer tick
              //delete timer
          },
          'cancel': function(coords) {
            // same as 'end'
          }
        });
      }
    }
  }]);
