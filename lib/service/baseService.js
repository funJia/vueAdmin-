var http = require("http");
var BufferHelper = require('bufferhelper');
var log4js = require("log4js");
var LogFile = log4js.getLogger('normal');
var get = function (cond, options) {
    var res = cond.res;
    res.set({ 'Content-Type': 'text/json', 'Encodeing': 'UTF-8' });
    //  options.timeout = 20 * 1000;
    LogFile.info(options);
    LogFile.info(options.host + options.path + "请求的数据");
    var reqs = http.request(options, function (serverFeedback) {
        if (serverFeedback.statusCode == 200) {
            var bufferHelper = new BufferHelper();
            serverFeedback.on('data', function (data) {
                bufferHelper.concat(data);
            }).on('end', function () {
                var html = bufferHelper.toBuffer().toString();
                res.status(200).send(html);
                LogFile.info(options.host + options.path + "返回的数据");
                LogFile.info(html);
            });
        }
        else {
            res.status(serverFeedback.statusCode).send("error");
        }
    });
    reqs.end();
};

var post = function (cond, options) {
    var dataStr = JSON.stringify(cond.param);
    LogFile.info(options);
    LogFile.info(options.host + options.path + "请求的数据");
    LogFile.info(dataStr);
    dataStr = new Buffer(dataStr);
    var res = cond.res;
    var isTimeout = false;
    res.set({ 'Content-Type': 'text/json', 'Encodeing': 'UTF-8' });
    options.timeout = 1;
    options.headers['Content-Length'] = dataStr.length;
    var reqs = http.request(options, function (serverFeedback) {
        if (isTimeout) {
            res.status(200).send(JSON.stringify({ timeout: true }));
            return;
        }
        if (serverFeedback.statusCode == 200) {
            var bufferHelper = new BufferHelper();
            serverFeedback.on('data', function (data) {
                bufferHelper.concat(data);
            }).on('end', function () {
                var html = bufferHelper.toBuffer().toString();
                res.status(200).send(html);
                LogFile.info(options.host + options.path + "返回的数据");
                LogFile.info(html);
            });
        }
        else {
            res.send("error")
        }
    });
    reqs.setTimeout(10 * 100000, function () {
        isTimeout = true;
    });
    reqs.write(dataStr);
    reqs.end();
};

var put = function (cond, options) {
    var dataStr =cond.param.data||"";
    LogFile.info(options);
    LogFile.info(options.host + options.path + "请求的数据");
    LogFile.info(dataStr);
    dataStr = new Buffer(dataStr);
    var res = cond.res;
    var isTimeout = false;
    res.set({ 'Content-Type': 'text/json', 'Encodeing': 'UTF-8' });
    options.timeout = 1;
    options.headers['Content-Length'] = dataStr.length;
    var reqs = http.request(options, function (serverFeedback) {
        if (isTimeout) {
            res.status(200).send(JSON.stringify({ timeout: true }));
            return;
        }
        if (serverFeedback.statusCode == 200) {
            var bufferHelper = new BufferHelper();
            serverFeedback.on('data', function (data) {
                bufferHelper.concat(data);
            }).on('end', function () {
                var html = bufferHelper.toBuffer().toString();
                res.status(200).send(html);
                LogFile.info(options.host + options.path + "返回的数据");
                LogFile.info(html);
            });
        }
        else {
            res.send("error")
        }
    });
    reqs.setTimeout(10 * 100000, function () {
        isTimeout = true;
    });
    reqs.write(dataStr);
    reqs.end();
};

var patch = function (cond, options) {
    var dataStr = JSON.stringify(cond.param);
    dataStr = new Buffer(dataStr);
    var res = cond.res;
    var isTimeout = false;
    res.set({ 'Content-Type': 'text/json', 'Encodeing': 'UTF-8' });
    options.timeout = 1;
    options.headers['Content-Length'] = dataStr.length;
    var reqs = http.request(options, function (serverFeedback) {
        if (isTimeout) {
            res.status(200).send(JSON.stringify({ timeout: true }));
            return;
        }
        if (serverFeedback.statusCode == 200) {
            var bufferHelper = new BufferHelper();
            serverFeedback.on('data', function (data) {
                bufferHelper.concat(data);
            }).on('end', function () {
                //响应json对象   
                var html = bufferHelper.toBuffer().toString();
                res.status(200).send(html);
            });
        }
        else {
            res.send("error");
        }
    });
    reqs.setTimeout(10 * 1000, function () {
        isTimeout = true;
    });
    reqs.write(dataStr);
    reqs.end();
};
var del = function (cond, options) {
    var dataStr = JSON.stringify(cond.param);
    dataStr = new Buffer(dataStr);
    var res = cond.res;
    var isTimeout = false;
    res.set({ 'Content-Type': 'text/json', 'Encodeing': 'UTF-8' });
    options.timeout = 1;
    options.headers['Content-Length'] = dataStr.length;
    var reqs = http.request(options, function (serverFeedback) {
        if (isTimeout) {
            res.status(200).send(JSON.stringify({ timeout: true }));
            return;
        }
        if (serverFeedback.statusCode == 200) {
            var bufferHelper = new BufferHelper();
            serverFeedback.on('data', function (data) {
                bufferHelper.concat(data);
            }).on('end', function () {
                //响应json对象   
                var html = bufferHelper.toBuffer().toString();
                res.status(200).send(html);
            });
        }
        else {
            res.send("error");
        }
    });
    reqs.setTimeout(10 * 1000, function () {
        isTimeout = true;
    });
    reqs.write(dataStr);
    reqs.end();
};
module.exports = {
    get: get,
    post: post,
    patch: patch,
    put:put,
    delete: del,
}