/**
 * Created by PCBt on 2015/10/8.
 */
require('should');
var rewire = require('rewire');
var eventManager = rewire('../lib/eventManager');

describe('event_list', function() {
    it('event_list\'s length should be 1', function() {
        var event_list = eventManager.__get__('event_list');
        (Object.keys(event_list).length).should.eql(1);
    });
});

describe('add_event', function() {
    it('event_list\'s length should increase after call of add_event', function() {
        var event_list = eventManager.__get__('event_list');
        var add_event = eventManager.add_event;

        add_event('test', function() {});
        (Object.keys(event_list).length).should.eql(2);

        add_event('test2', function() {});
        (Object.keys(event_list).length).should.eql(3);
    });
});

describe('event_handler', function() {
    it('handler should work if event_list exits handler', function(done) {
        var add_event = eventManager.add_event;
        var event_handler = eventManager.event_handler;

        add_event('test3', function(data) {
            done();
        });
        event_handler('test3','test_data');
    });

    it('it would do nothing if event_list does not exit handler', function() {
        var add_event = eventManager.add_event;
        var event_handler = eventManager.event_handler;

        add_event('test4');
        event_handler('test4','test_data');
    });
});