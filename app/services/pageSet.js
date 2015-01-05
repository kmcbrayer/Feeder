'use strict';

angular.module('feederApp')
  .value('pageSet', [
      {
        name: "Main",
        isActive: true,
        position: "first"
      },
      {
        name: "Twitter",
        isActive: false,
        position: "second"
      },
      {
        name: "Youtube",
        isActive: false,
        position: "third"
      },
      {
        name: "Instagram",
        isActive: false,
        position: "fourth"
      }
    ]
  );