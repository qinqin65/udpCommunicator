/**
 * Created by PCBt on 2015/9/22.
 */

/**
 * 消息队列管理
 */

//消息队列 {record_id:record}
var messages = {};

exports.add_record = add_record;
exports.check_duplication = check_duplication;
exports.delete_record = delete_record;

/**
 * 新增消息到队列并根据超时时间定时，超时后调用消息队列里的resending重新发送一次，直到达到次数上限。发送时调用
 * @param record_id String
 * @param record_data Object
 */
function add_record(record_id, record_data) {
    messages[record_id] = record_data;
    messages[record_id].timeout_handle = setInterval(function () {
        messages[record_id].con_times--;
        if(messages[record_id].con_times == 0) {
            delete_record(record_id, "send data fiald");
            return;
        }
        messages[record_id].resending();
    }, messages[record_id].con_timeout * 1000);
}

/**
 * 删除消息记录，清除计时器对象。发送成功或失败后调用
 * @param record_id
 * @param data 传输成功或失败的信息
 */
function delete_record(record_id, data) {
    clearTimeout( messages[record_id].timeout_handle);
    if(typeof messages[record_id].callback == 'function') {
        messages[record_id].callback(data);
    }
    delete messages[record_id];
}

/**
 * 检查重复，如果已经存在id则返回true，否则返回false
 * @param record_id
 * @returns {boolean}
 */
function check_duplication(record_id) {
    for(var rec_id in messages) {
        if(rec_id == record_id) {
            return true;
        }
    }
    return false;
}