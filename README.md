# udpCommunicator
基于node.js实现类似udt协议的module，用于实现udp可靠传输。

示例：接收
var udp = require('./udpCommunicator');

udp.init("localhost", 55331, null, 55332, 10, 3);

udp.on('data', function(data) {
    console.log('udp_test_listen:' + data.data);
});

示例：发送
var udp = require('./udpCommunicator');

udp.init("127.0.0.1", 55332, null, 55331, 10, 5);

for(var i=0; i < 10; i++) {
    udp.send_data([1,2,3,4,5,6], function (err) {
        var data = err ? err : "send data success";
        console.log('udp_test_send:' + data);
    });
}

udp.send_data('test without callback');