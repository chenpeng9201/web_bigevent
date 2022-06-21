// 给ajax设置请求根路径
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // options.url = 'http://big-event-api-t.itheima.net' + options.url;
    // 为需要权限验证的接口统一添加请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || "",
        }
    }

    // 为全局挂在complete回调函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 认证失败，跳转到登录页面
            // 回到登录页
            location.href = '/login.html';
            // 清空token
            localStorage.removeItem('token');
        }
    }
})