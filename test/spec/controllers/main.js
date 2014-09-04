'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('feederApp'));
  console.log('')
  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope,
                              twitterUser,twitterStatuses,instagramFeed,youtubeSubs) {
    $httpBackend = _$httpBackend_;
    //backend mock response
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
    scope = $rootScope.$new();
    //init controller
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach the current user to the scope', function () {
    expect(scope.twitterList).not.toBe(null);
    expect(scope.instagramList).not.toBe(null);
    expect(scope.youtubeList).not.toBe(null);
    $httpBackend.flush();
  });
});
