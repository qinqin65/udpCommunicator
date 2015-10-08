/**
 * Created by PCBt on 2015/9/22.
 */

/**
 *监听事件管理，根据on(event,callback)注册的事件及回调函数在事件响应时调用指定的回调函数
 */

var ms_mgr = require('./messageManager');

/**
 * 事件列表，默认有confirmation事件，监听会送确认事件
 * @String {{confirmation: confirmation_handle}}
 */
var event_list = {
    "confirmation":confirmation_handle
};

exports.event_handler = event_handler;
exports.add_event = add_event;

/**
 * 时间处理函数
 * @param event
 * @param data
 */
function event_handler(event, data) {
    var handler = event_list[event];
    if(typeof handler == "function") {
        handler(data);
    }
}

/**
 * 添加事件及对应处理函数
 * @param event
 * @param callback
 */
function add_event(event, callback) {
    event_list[event] = callback;
}

/**
 * 默认的会送确认处理函数
 * @param data
 */
function confirmation_handle(data) {
    var id = data.data;
    ms_mgr.delete_record(id);
}