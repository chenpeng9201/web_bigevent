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

    // 使用layui自定义表单验证
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    });
});