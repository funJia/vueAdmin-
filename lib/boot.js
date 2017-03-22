/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');
var CURD = require('./router/CURD');
//var reviewMgCtrl = require('./router/reviewMgRouter');
//var orderMgCtrl = require('./router/orderMgCtrl');

module.exports = function (parent, options) {
  var verbose = options.verbose;
  fs.readdirSync(__dirname + '/../controllers').forEach(function (name) {
    //有用的模块--只有在这配置了的模块请求才会生效，否则return
    var effecModule = ["project"];
    if (effecModule.indexOf(name) === -1) return;

    verbose && console.log('\n   %s:', name);
    var obj = require('./../controllers/' + name);
    var name = obj.name || name;
    var prefix = obj.prefix || '';
    var app = express();
    var handler;
    var routerInfo = { method: "", path: "" };
    var method;
    var path;
    var res = false;
    // allow specifying the view engine
    if (obj.engine) app.set('view engine', obj.engine);
    app.set('views', __dirname + '/../controllers/' + name + '/views');

    // generate routes based
    // on the exported methods
    for (var key in obj) {
      // "reserved" exports
      if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
      res=false;
      res = CURD(name, key, routerInfo, res);          
         
      //res = reviewMgCtrl(name, key, routerInfo, res);           
      
      //res = orderMgCtrl(name, key, routerInfo, res);
      if (!res)
        continue;
      // setup
      handler = obj[key];
      path = prefix + routerInfo.path;
      method = routerInfo.method;

      // before middleware support
      if (obj.before) {
        app[method](path, obj.before, handler);
        verbose && console.log('     %s %s -> before -> %s', method.toUpperCase(), path, key);
      } else {
        app[method](path, handler);
        verbose && console.log('     %s %s -> %s', method.toUpperCase(), path, key);
      }
    }

    // mount the app
    parent.use(app);
  });
};
