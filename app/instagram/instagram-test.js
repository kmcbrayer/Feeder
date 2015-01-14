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