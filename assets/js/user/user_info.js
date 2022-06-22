$(function() {
    var form = layui.form;
    var layer = layui.layer;
    initUserInfo(); //初始化用户信息

    // 监听重置按钮点击事件
    $('#btnReset').on('click', function(e) {
        e.preventDefault(); //阻止默认重置行为
        initUserInfo() //重新初始化用户信息
    });

    // 监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault(); //阻止默认重置行为
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败');
                }
                layer.msg('更新用户信息成功');

                // 刷新父页面用户信息
                window.parent.getUserInfo();

            }
        });
    });

    // 表单验证
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度不能超过6位!";
            }
        }
    });

    // 获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }
                // console.log(res);
                form.val('fromUserInfo', res.data);
            }
        });
    }
});