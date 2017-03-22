// api模块
var service = require("../../lib/service")

//  查询列表
exports.getList = function(req, res) {
    var cond={
        param:{First:req.query},
        res:res
    };
    service.ProjectService.getList(cond);
}