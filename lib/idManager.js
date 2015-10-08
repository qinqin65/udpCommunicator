/**
 * Created by PCBt on 2015/9/22.
 */
/**
 * 消息的id管理
 */
var ms_mgr= require('./messageManager');

exports.yield_id = yield_id;

/**
 * 产生id，获取时间戳后加上一位随机数
 * @returns {*}
 */
function yield_id() {
    var time = new Date().getTime();
    var id = String(time) + String(Math.floor(Math.random()*10));
    if(ms_mgr.check_duplication(id)) {
        return yield_id();
    } else {
        return id;
    }
}