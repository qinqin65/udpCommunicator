/**
 * Created by PCBt on 2015/10/8.
 */
require('should');
var dataformate = require('../lib/dataformat');

describe('dataformate',function() {
    it('data formated should have the property of data', function() {
        var test_data = dataformate('test_data','test_type');
        test_data.should.have.property('data','test_data');
    });

    it('data formated should have the property of type', function() {
        var test_data = dataformate('test_data','test_type');
        test_data.should.have.property('type','test_type');
    });

    it('data formated should have the property of _id', function() {
        var test_data = dataformate('test_data','test_type');
        test_data.should.have.property('_id');
    });

    it('the data property of data formated should equal to data', function() {
        var test_data = dataformate('test_data','test_type');
        test_data.data.should.eql('test_data');
    });

    it('the type property of data formated should equal to type', function() {
        var test_data = dataformate('test_data','test_type');
        test_data.type.should.eql('test_type');
    });
});