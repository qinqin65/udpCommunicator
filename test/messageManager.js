/**
 * Created by PCBt on 2015/10/8.
 */
require('should');
var rewire = require('rewire');
var messageManager = rewire('../lib/messageManager');

describe('add_record', function() {
    it('message object length should increase when add_record is called', function() {
        var add_record = messageManager.add_record;
        var message = messageManager.__get__('messages');

        (Object.keys(message).length).should.eql(0);
        add_record('test', 'test_data');
        (Object.keys(message).length).should.eql(1);
    });
});

describe('delete_record', function() {
    it('message object length should decrease when delete_record is called', function() {
        var add_record = messageManager.add_record;
        var delete_record = messageManager.delete_record;
        var message = messageManager.__get__('messages');

        add_record('test1', 'test_data');
        var pre_len = Object.keys(message).length;
        delete_record('test1', 'test_data');
        (Object.keys(message).length).should.eql(pre_len - 1);
    });

    it('delete_record should delete correct item', function() {
        var add_record = messageManager.add_record;
        var delete_record = messageManager.delete_record;
        var message = messageManager.__get__('messages');

        add_record('test2', 'test_data');
        message.should.have.property('test2');
        delete_record('test2', 'test_data');
        message.should.not.have.property('test2');
    });
});

describe('check_duplication', function() {
    it('it should return true if the id already exists', function() {
        var add_record = messageManager.add_record;
        var check_duplication = messageManager.check_duplication;
        var test_id = 'test_id';

        add_record(test_id, 'test_data');
        check_duplication(test_id).should.eql(true);
    });

    it('it should return false if the id does not exist', function() {
        var add_record = messageManager.add_record;
        var check_duplication = messageManager.check_duplication;
        var test_id = 'test_id_2';

        add_record(test_id, 'test_data');
        check_duplication('test_id_does_not_exist').should.eql(false);
    });
});