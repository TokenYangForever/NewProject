// run mocha here
// mocha是测试框架，这里断言用的node内建的assert模块，还可以引入chai这种断言库
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});