'use strict';

angular.module('feederApp')
  .value('twitterStatuses',
    [
      {
        type: 'twitter',
        date: {
          _isAMomentObject: true,
          _d: 'Tue Jan 13 2015'
        },
        caption: 'This is a caption',
        entities: {},//objects n stuff
        userLink: 'http://google.com',
        user: 'A User',
        photo: 'http://google.com',
      },
      {
        type: 'twitter',
        date: {
          _isAMomentObject: true,
          _d: 'Tue Jan 13 2015'
        },
        caption: 'This is a caption 2',
        entities: {},//objects n stuff
        userLink: 'http://google.com',
        user: 'A Second User',
        photo: 'http://google.com',
      }
    ]
);