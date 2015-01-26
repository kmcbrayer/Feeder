'use strict';

angular.module('feederApp')
  .service('pageSet', function() {
    this.list = [
      {
        name: "Main",
        isActive: true,
        position: "first",
        href: "#",
        pageTarget : ''
      },
      {
        name: "Twitter",
        isActive: false,
        position: "second",
        href: "/authin/twitter",
        pageTarget : '_self'
      },
      {
        name: "Youtube",
        isActive: false,
        position: "third",
        href: "/authin/youtube",
        pageTarget : '_self'
      },
      {
        name: "Instagram",
        isActive: false,
        position: "fourth",
        href: "/authin/instagram",
        pageTarget : '_self'
      }
    ];
  });
