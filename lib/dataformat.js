/**
 * Created by PCBt on 2015/9/22.
 */

/**
 * 统一传输的数据格式
 */

var id_mgr = require('./idManager');

module.exports = function(data, type) {
    return {
        _id: id_mgr.yield_id(),
        data: data,
        type: type
    };
};