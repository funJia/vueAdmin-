/*CURDRouter*/
function initRouter(name, key, routerInfo, res) {
    if (res)
        return res;
    switch (key) {
        case 'edit':
            routerInfo.method = 'post';
            routerInfo.path = '/api/' + name + "/edit";
            return true;
        case 'getList':
            routerInfo.method = 'get';
            routerInfo.path = '/api/' + name + "/getList";
            return true;
        case 'getDetail':
            routerInfo.method = 'get';
            routerInfo.path = '/api/' + name + "/getDetail";
            return true;
        case 'delete':
            routerInfo.method = 'post';
            routerInfo.path = '/api/' + name + "/delete";
            return true;
        default:
            return false;
    }
}

module.exports = initRouter;