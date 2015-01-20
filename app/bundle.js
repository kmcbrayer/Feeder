'use strict';

angular.module('feederApp')
  .controller('AppCtrl', function ($scope, $http, UserService) {
    $scope.user = UserService;
    $scope.clear = function() {
      UserService.clear();
    }
    $scope.testMode = false;
  });
'use strict';

angular.module('feederApp', [
  'ngCookies',
  'ngRoute',
  'ngTouch',
  'ngSanitize'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main_page/main.html',
        controller: 'MainCtrl'
      })
      .when('/twitter', {
        templateUrl: 'twitter/twitter.html',
        controller: 'TwitterCtrl'
      })
      .when('/facebook', {
        templateUrl: 'facebook/facebook.html',
        controller: 'FacebookCtrl'
      })
      .when('/youtube', {
        templateUrl: 'youtube/youtube.html',
        controller: 'YoutubeCtrl'
      })
      .when('/instagram', {
        templateUrl: 'instagram/instagram.html',
        controller: 'InstagramCtrl'
      });
    $locationProvider.html5Mode(true);
  });
'use strict';

angular.module('feederApp')
  .filter('twitterCaption', function() {
      return function(text) {
        var urlRegex = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/g;
        var twitterUserRegex = /@([a-zA-Z0-9_]{1,20})/g;
        var twitterHashTagRegex = /\B#(\w+)/g;
        if (text) {
          text = text.replace(urlRegex," <a href='$&' target='_blank'>$&</a>").trim();
          text = text.replace(twitterUserRegex,"<a href='http://www.twitter.com/$1' target='_blank'>@$1</a>");
          text = text.replace(twitterHashTagRegex,"<a href='http://twitter.com/search/%23$1' target='_blank'>#$1</a>");
        }
        return text;
      }
  });
'use strict';

angular.module('feederApp')
  .filter('youtubeDescription', function() {
    return function(text) {
      if (text)
        return text.substring(0,140)+"...";
    }
  })
'use strict';

angular.module('feederApp')
.directive('igram', function() {
  return {
    restrict: 'E',
    templateUrl: 'instagram/instagram-directive.html',
    scope: {
      igram: "="
    }
  }
})
'use strict'; 

describe('Controller: InstagramCtrl', function() {
  beforeEach(module('feederApp'));
  var InstagramCtrl,
    scope,
    $httpBackend;

  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, instagramFeed) {
    $httpBackend = _$httpBackend_;

    $httpBackend.when('GET', '/api/instagram/feed')
      .respond(
        instagramFeed
      );
    scope = $rootScope.$new();
    InstagramCtrl = $controller('InstagramCtrl', {
      $scope: scope
    });
  }));

  it('should get instagram data and attach to the scope', function() {
    $httpBackend.flush();
    expect(scope.dataList[0].type).toBe('image');
    expect(scope.dataList[0].id).toBe('791336301699919946_210318195');
  });
});
'use strict';

angular.module('feederApp')
  .controller('InstagramCtrl', function($scope, $http) {
    $http.get('/api/instagram/feed').success(function(data) {
        $scope.dataList = data;
    });
  });
'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('feederApp'));
  console.log('----------------------------------------')
  var MainCtrl,
    scope,
    pSet,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope,
                              twitterUser,twitterStatuses,instagramFeed,youtubeSubs,pageSet ) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    pSet = pageSet;

    //do backend mocking
    $httpBackend.when('GET', '/api/twitter/statuses')
      .respond(
        twitterStatuses
      );
    $httpBackend.when('GET', '/api/instagram/feed')
      .respond(
        instagramFeed
      );
    $httpBackend.when('GET', '/api/youtube/subscriptions')
      .respond(
        youtubeSubs
      );
    //init controller
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));
  
  it('should attach the current user to the scope', function () {
    $httpBackend.flush();
    expect(scope.twitterList[0].type).toBe('twitter');
    expect(scope.instagramList).not.toBe(null);
    expect(scope.youtubeList).not.toBe(null);
    
  });

  it('should change the pages z-index(position) onSwipe', function () {
    //control data
    expect(pSet[0].name).toBe('Main');
    expect(pSet[0].position).toBe('first');
    expect(pSet[3].name).toBe('Instagram');
    expect(pSet[3].position).toBe('fourth');
    //test swipe left
    scope.swipeLeft();
    expect(pSet[0].name).toBe('Main');
    expect(pSet[0].position).toBe('fourth');
    expect(pSet[3].name).toBe('Instagram');
    expect(pSet[3].position).toBe('third');
    //test swipe right
    scope.swipeRight();
    expect(pSet[0].name).toBe('Main');
    expect(pSet[0].position).toBe('first');
    expect(pSet[3].name).toBe('Instagram');
    expect(pSet[3].position).toBe('fourth');
  });
});

'use strict';

angular.module('feederApp')
  .controller('MainCtrl', function ($scope, $http, $q, pageSet, UserService) {
    //update user service first thing:
    UserService.updateTwitterInfo();
    UserService.updateInstagramInfo();
    UserService.updateYoutubeInfo();
    var twitterList, youtubeList, instagramList = [];

    $scope.dataList = [];
    $q.all([
      $http.get('/api/twitter/statuses').success(function(data) {
        twitterList = data;
        $scope.twitterList = twitterList;
      }),
      $http.get('/api/instagram/feed').success(function(feed) {
        instagramList = feed;
        $scope.instagramList = instagramList;
      }),
      $http.get('/api/youtube/subscriptions').success(function(subs) {
        youtubeList = subs;
        $scope.youtubeList = youtubeList;
      })
    ]).then(function() {
      if (twitterList !== []) {
        $scope.dataList = $scope.dataList.concat($scope.twitterList);
      }
      if (instagramList !== []) {
        $scope.dataList = $scope.dataList.concat($scope.instagramList);
      }
      if (youtubeList !== []) {
        $scope.dataList = $scope.dataList.concat($scope.youtubeList);
      }
      $scope.dataList = $scope.dataList.sort(function(a, b) {
        if(a.date > b.date)
          return -1;
        if(a.date < b.date)
          return 1;
        return 0
      });
    });
    //page locations and init
    
    $scope.pageSet = pageSet;
    $scope.active=0;
    /*
    $scope.swipeLeft = function() {
      //active tab controls
      $scope.pageSet[$scope.active].isActive = false;
      
      $scope.pageSet.forEach(function(page) {
        var pos = page.position;
        if (pos == "first") 
          page.position = "fourth"
        if (pos == "second") 
          page.position = "first"
        if (pos == "third") 
          page.position = "second"
        if (pos == "fourth") 
          page.position = "third"
      });
      
      $scope.active++;
      if ($scope.active > 3) {
        $scope.active=0;
      }
      $scope.pageSet[$scope.active].isActive = true;
      // insert cool transitions? 

    };

    $scope.swipeRight = function() {
      $scope.pageSet[$scope.active].isActive = false;
      $scope.pageSet.forEach(function(page) {
        var pos = page.position;
        if (pos == "first") 
          page.position = "second"
        if (pos == "second") 
          page.position = "third"
        if (pos == "third") 
          page.position = "fourth"
        if (pos == "fourth") 
          page.position = "first"
      });

      $scope.active--;

      if ($scope.active <0) {
        $scope.active = 3;
      }
      $scope.pageSet[$scope.active].isActive = true;
      // insert cool transitions?
    }
    */

  });

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
            //console.log(ele);
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
'use strict';

angular.module('feederApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'twitter',
      'link': '/twitter'
    },
    {
      'title': 'youtube',
      'link': '/youtube'
    },
    {
      'title': 'instagram',
      'link': '/instagram'
    }];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });

'use strict';

angular.module('feederApp')
.directive('tweet', function() {
  return {
    restrict: 'E',
    templateUrl: 'twitter/twitter-directive.html',
    scope: {
      tweet: "="
    }
  }
})
'use strict';

describe('Controller: TwitterCtrl', function () {

  // load the controller's module
  beforeEach(module('feederApp'));

  var TwitterCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_,$controller, $rootScope, twitterStatuses) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    //set up requests
    $httpBackend.when('GET', '/api/twitter/statuses')
      .respond(
        twitterStatuses
      );
    //ctrl init
    TwitterCtrl = $controller('TwitterCtrl', {
      $scope: scope
    });
  }));

  it('should attach the current user to the scope', function () {
    //gotta flush before data use
    $httpBackend.flush();
    //actual tests
    expect(scope.dataList[0].type).toBe('twitter');
    //do more tests
  });
});

'use strict';

/**
 * @ngdoc function
 * @name feederApp.controller:TwitterCtrl
 * @description
 * # TwitterCtrl
 * Controller of the feederApp
 */
angular.module('feederApp')
  .controller('TwitterCtrl', function ($scope,$http) {
    $http.get('/api/twitter/statuses').success(function(data) {
      $scope.dataList = data;
    })
  });

'use strict';

angular.module('feederApp')
.directive('ytube', function() {
  return {
    restrict: 'E',
    templateUrl: 'youtube/youtube-directive.html',
    scope: {
      ytube: "="
    }
  }
})
'use strict'; 

describe('Controller: YoutubeCtrl', function() {
  beforeEach(module('feederApp'));
  var YoutubeCtrl,
    scope,
    $httpBackend;

  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, youtubeSubs) {
    $httpBackend = _$httpBackend_;

    $httpBackend.when('GET', '/api/youtube/subscriptions')
      .respond(
        youtubeSubs
      );
    scope = $rootScope.$new();
    YoutubeCtrl = $controller('YoutubeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a user to the scope', function() {
    $httpBackend.flush();
    expect(scope.dataList[0].type).toBe("youtube");
    expect(scope.dataList[0].videoId).toBe(777);
  });
});
'use strict';

angular.module('feederApp')
  .controller('YoutubeCtrl', function($scope, $http) {
    
    $http.get('/api/youtube/subscriptions').success(function(data) {
      $scope.dataList = data;
    })
  });