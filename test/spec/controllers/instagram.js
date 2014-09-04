'use strict'; 

describe('Controller: InstagramCtrl', function() {
  beforeEach(module('feederApp'));
  var InstagramCtrl,
    scope,
    $httpBackend;

  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, MockUserService, instagramFeed) {
    $httpBackend = _$httpBackend_;

    $httpBackend.when('GET', '/api/instagram/feed')
      .respond(
        instagramFeed
      );
    scope = $rootScope.$new();
    InstagramCtrl = $controller('InstagramCtrl', {
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