

exports.config = {
  seleniumAddress: 'http://www.devsite.com:4444/wd/hub',
  specs: ['test/e2e/*.js'],
  baseUrl: 'http://www.devsite.com:9001'
}