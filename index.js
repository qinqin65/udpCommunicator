/**
 * Created by PCBt on 2015/9/21.
 */
var event_mgr = require('./lib/eventManager');
var udp_socket = require('./lib/udpSocket');

//带参数初始化
exports.init = udp_socket.init;
//发送任意类型数据（字符串、数字、数组、json已测试通过）
exports.send_data = udp_socket.send_data;
//给指定ip单独发送数据
exports.send_data_to_ip = udp_socket.send_data_to_ip;
//监听指定消息
exports.on = on;

/**
 * 接收指定消息,如：on("session",handler)接收客户端传过来的session
 * @param event
 * @param callback
 */
function on(event, callback) {
    event_mgr.add_event(event, callback);
}