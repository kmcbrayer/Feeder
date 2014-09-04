'use strict';

describe('Controller: TwitterCtrl', function () {

  // load the controller's module
  beforeEach(module('feederApp'));

  var TwitterCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_,$controller, $rootScope, MockUserService, twitterStatuses) {
    $httpBackend = _$httpBackend_;
    
    $httpBackend.when('GET', '/api/twitter/statuses')
      .respond(
        twitterStatuses
      );
    scope = $rootScope.$new();
    TwitterCtrl = $controller('TwitterCtrl', {
      $scope: scope,
      UserService: MockUserService
    });
  }));

  it('should attach the current user to the scope', function () {
    expect(scope.user).not.toBe(null);
    expect(scope.dataList).not.toBe(null);
    $httpBackend.flush();
    expect(scope.user.id).toBe(7);
  });
});
