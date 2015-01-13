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

  it('should change the pages z-index onSwipe', function () {
    //test control data
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
