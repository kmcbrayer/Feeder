'use strict';

describe('Controller: TwitterCtrl', function () {

  // load the controller's module
  beforeEach(module('feederApp'));

  var ctrlService,
    TwitterCtrl,
    scope,
    resp,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_,$controller, $rootScope, twitterStatuses) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    ctrlService = $controller;
    resp = twitterStatuses;
  }));

  it('should attach the current user to the scope', function () {
    //set up requests
    $httpBackend.when('GET', '/api/twitter/statuses')
      .respond(
        resp
      );
    //ctrl init
    TwitterCtrl = ctrlService('TwitterCtrl', {
      $scope: scope
    });
    //gotta flush before data use
    $httpBackend.flush();
    //actual tests
    expect(scope.dataList[0].type).toBe('twitter');
    //do more tests
  });
});
