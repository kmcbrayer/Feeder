'use strict';

angular.module('feederApp')
  .value('pageSet', [
      {
        name: "Main",
        isActive: true,
        position: "first",
        href: "#"
      },
      {
        name: "Twitter",
        isActive: false,
        position: "second",
        href: "/authin/twitter"
      },
      {
        name: "Youtube",
        isActive: false,
        position: "third",
        href: "/authin/youtube"
      },
      {
        name: "Instagram",
        isActive: false,
        position: "fourth",
        href: "/authin/instagram"
      }
    ]
  );