var baseService = require("./baseService");
const queryString = require('query-string');
var setOptions = function (path, method, length) {
    var options = {
        host: "",
        port: "",
        path: path,
        method: method,
        headers: {
           // "Content-Type": 'application/json;charset=UTF-8',
            "Content-Type": 'application/json',
            /// "token": "1"
        }
    };
    return options;
}
module.exports = {
    //  查询产品列表
    getList: function (cond) {        
        cond.url = "/PM_Product/GetPageList";        
        var options = setOptions(cond.url, 'post', cond.param.length);
        baseService.post(cond, options);
    }
}