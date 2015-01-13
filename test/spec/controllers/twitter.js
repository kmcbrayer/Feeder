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
