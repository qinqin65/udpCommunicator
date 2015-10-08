/**
 * Created by PCBt on 2015/9/23.
 */
var dgram = require('dgram');
var data_format = require('./dataformat');
var event_mgr = require('./eventManager');
var ms_mgr = require('./messageManager');

exports.init = init;
exports.send_data = send_data;
exports.send_data_to_ip = send_data_to_ip;

//发送目标的ip地址
var SEND_IP;
//监听的ip地址
var LISEN_IP;
//发送目标的端口号
var SEND_PORT;
//监听的端口号
var LISTEN_PORT;
//连接超时时间
var CON_TIMEOUT;
//超时连接次数
var CON_TIMES;
//udp对象，用于udp通信
var sock;

/**
 * 带参数初始化
 * @param ip String 通讯目标的ip地址
 * @param port Number 腾讯目标的端口
 * @param listen_ip String 监听ip地址，不传或传空字符串则监听所有ip
 * @param listen_port Number 监听的端口
 * @param timeout Number 通讯超时时间
 * @param con_times Number 超时后重发次数
 */
function init(ip, port, listen_ip, listen_port, timeout, con_times) {
    SEND_IP = ip;
    LISEN_IP = listen_ip;
    SEND_PORT = port;
    LISTEN_PORT = listen_port;
    CON_TIMEOUT = timeout;
    CON_TIMES = con_times;

    //创建udp socket对象
    sock = dgram.createSocket('udp4');
    //监听
    sock.bind(LISTEN_PORT, LISEN_IP);
    sock.on('message', listen);
}

/**
 * 发送数据
 * @param data 任意类型的数据
 * @param callback 发送成功或失败时执行的回调函数，如果失败则参数为错误原因字符串，成功则参数为null
 */
function send_data(data, callback) {
    var send_data_type = "data";
    var send_data = data_format(data, send_data_type);
    send_data_to_ip(null, null, send_data, callback);
    ms_mgr.add_record(send_data._id, {
        con_timeout: CON_TIMEOUT || 20,
        con_times: CON_TIMES || 5,
        callback: callback,
        resending: function() {
            send_data_to_ip(null, null, send_data, callback);
        }
    });
}

/**
 * 单独发送消息给指定ip
 * @param ip
 * @param port
 * @param data
 * @param callback
 */
function send_data_to_ip(ip, port, data, callback) {
    var to_ip = ip || SEND_IP;
    var to_port = port || SEND_PORT;
    var buf = new Buffer(JSON.stringify(data));
    sock.send(buf, 0, buf.length, to_port, to_ip, function(err) {
        if(err && (typeof callback == "function")) {
            callback(err);
        }
    });
}

/**
 * 收到消息后回送确认信息
 * @param data_id String 收到的消息的id
 * @param ip String 收到的消息的ip
 * @param port Number 收到的消息的port
 */
function send_conformation(data_id, ip, port) {
    var send_data_type = "confirmation";
    var send_data = data_format(data_id, send_data_type);
    send_data_to_ip(ip, port, send_data);
}

/**
 * 监听
 * @param message 任意类型的数据
 * @param remote Object 发消息的远程主机的信息
 */
function listen(message, remote) {
    var data = JSON.parse(message);
    var event_type = data.type;
    if(event_type != "confirmation") {
        send_conformation(data._id, remote.address, remote.port);
    }
    event_mgr.event_handler(event_type, data);
}