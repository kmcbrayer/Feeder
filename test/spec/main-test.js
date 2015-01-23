'use strict';

describe('Controller: MainCtrl', function () {
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
    
    //mock feed data
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
});
