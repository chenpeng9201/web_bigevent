$(function() {
    $("#link_reg").on('click', function() {
        // 显示注册界面
        $('.reg-box').show();
        //隐藏登录界面
        $('.login-box').hide();
    });

    $("#link_login").on('click', function() {
        // 显示登录界面
        $('.login-box').show();
        //隐藏注册界面
        $('.reg-box').hide();
    });
});