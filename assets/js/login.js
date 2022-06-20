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
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次密码输入不一致!"
            }
        }
    });

    // 注册功能
    function reg() {
        var username = $('.reg-box .layui-form [name=username]').val();
        var password = $('.reg-box .layui-form [name=password]').val();
        // 发起Ajax请求
        $.ajax('/api/reguser', {
            type: 'POST',
            data: { username: username, password: password },
            success: function(res) {
                layer.msg(res.message);
                $('#link_login').click(); //模拟用户点击登录
            }
        });
    }

    // 登录功能
    function login(data) {
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: data,
            success: function(res) {
                if (res.status === 0) {
                    // 将token存起来
                    localStorage.setItem('token', res.token);
                    // 跳转到index主页
                    location.href = '/index.html';
                }
                layer.msg(res.message);
            }
        });
    }

    // 给注册表单绑定提交时间
    $('#form-reg').on('submit', function(e) {
        e.preventDefault();
        reg();
    });

    //监听登录表单提交事件
    $('#form-login').on('submit', function(e) {
        e.preventDefault(); //组织表单默认提交事件
        login($(this).serialize());
    })

});