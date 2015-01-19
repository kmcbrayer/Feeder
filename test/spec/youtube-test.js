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