'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('feederApp'));
  console.log('')
  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope,twitterUser) {
    $httpBackend = _$httpBackend_;
    //backend mock response
    $httpBackend.when('GET', '/api/twitter/currentUser')
      .respond(
        twitterUser
      );
    scope = $rootScope.$new();
    //init controller
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach the current user to the scope', function () {
    expect(scope.user).not.toBe(null);
    $httpBackend.flush();
    expect(scope.user.id).toBe(7);
  });
});
