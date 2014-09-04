'use strict'; 

describe('Controller: YoutubeCtrl', function() {
  beforeEach(module('feederApp'));
  var YoutubeCtrl,
    scope,
    $httpBackend;

  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, MockUserService, youtubeSubs) {
    $httpBackend = _$httpBackend_;

    $httpBackend.when('GET', '/api/youtube/subscriptions')
      .respond(
        youtubeSubs
      );
    scope = $rootScope.$new();
    YoutubeCtrl = $controller('YoutubeCtrl', {
      $scope: scope,
      UserService: MockUserService
    });
  }));

  it('should attach a user to the scope', function() {
    expect(scope.user).not.toBe(null);
    expect(scope.dataList).not.toBe(null);
    $httpBackend.flush();
  });
});