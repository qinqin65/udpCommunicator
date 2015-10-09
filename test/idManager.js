/**
 * Created by PCBt on 2015/10/8.
 */
require('should');
var idManager = require('../lib/idManager');

describe('yield_id', function() {
    it('it should create id with timestamp and a bit random number', function() {
        var yield_id = idManager.yield_id;
        yield_id().length.should.eql(14);
    });
});