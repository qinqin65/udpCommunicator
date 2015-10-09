/**
 * Created by PCBt on 2015/10/8.
 */
require('should');
var rewire = require('rewire');
var udpSocket = rewire('../lib/udpSocket');

describe('init',function() {
    it('it should set value to relative variables', function() {
        var init = udpSocket.init;
        var send_ip = '127.0.0.1';
        var send_port = 55330;
        var listen_ip = '';
        var listen_port = 55331;
        var con_timeout = 10;
        var con_times = 3;

        udpSocket.__set__('listen', function(message,remote) {

        });

        init(send_ip,send_port,listen_ip,listen_port,con_timeout,con_times);

        var udp_socket_send_ip = udpSocket.__get__('SEND_IP');
        var udp_socket_send_port = udpSocket.__get__('SEND_PORT');
        var udp_socket_listen_ip = udpSocket.__get__('LISTEN_IP');
        var udp_socket_listen_port = udpSocket.__get__('LISTEN_PORT');
        var udp_socket_con_timeout = udpSocket.__get__('CON_TIMEOUT');
        var udp_socket_con_times = udpSocket.__get__('CON_TIMES');
        var udp_socket_sock = udpSocket.__get__('sock');

        udp_socket_send_ip.should.eql(send_ip);
        udp_socket_send_port.should.eql(send_port);
        udp_socket_listen_ip.should.eql(listen_ip);
        udp_socket_listen_port.should.eql(listen_port);
        udp_socket_con_timeout.should.eql(con_timeout);
        udp_socket_con_times.should.eql(con_times);
        (typeof udp_socket_sock).should.eql('object');
    });
});

describe('send_data', function() {
    it('it should send data', function(done) {
        udpSocket.__set__('listen', function(message,remote) {
            done();
        });
        udpSocket.init('localhost',55332,'',55332,5,3);
        udpSocket.send_data('test_data');
    });
});

describe('send_data_to_ip', function() {
    it('it colud send data to specified ip', function(done) {
        udpSocket.__set__('listen', function(message,remote) {
            done();
        });
        udpSocket.init('localhost',55334,'',55335,5,3);
        udpSocket.send_data_to_ip('localhost',55335,'test_data');
    });
});

describe('send_conformation', function() {
    it('it would send data with text confirmation', function(done) {
        var send_conformation = udpSocket.__get__('send_conformation');
        udpSocket.__set__('listen', function(message,remote) {
            JSON.parse(message.toString()).should.have.property('type','confirmation');
            done();
        });
        udpSocket.init('localhost',55336,'',55336,5,3);
        send_conformation('test_id','localhost',55336);
    });
});

describe('listen', function() {
    it('it would receive message when a client send a data to itself', function() {
        udpSocket.__set__('listen', function(message,remote) {
            JSON.parse(message.toString()).should.have.property('data','test_data');
            done();
        });
        udpSocket.init('localhost',55337,'',55337,5,3);
        udpSocket.send_data('test_data');
    });
});