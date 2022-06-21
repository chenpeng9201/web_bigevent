$(function() {
    var layer = layui.layer;
    getUserInfo();
    // 监听退出按钮点击事件
    $('#logout').on('click', function() {
        logout();
    })
});

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || "",
        // },
        success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败！");
                }
                renderAvatar(res.data);
            }
            // complete: function(res) {
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //         // 认证失败，跳转到登录页面
            //         // 回到登录页
            //         location.href = '/login.html';
            //         // 清空token
            //         localStorage.removeItem('token');
            //     }
            // }
    });
}

//用户头像渲染
function renderAvatar(user) {
    var name = user.nickname || user.username || '';
    // 设置用户姓名
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);

    if (user.user_pic !== null) {
        //优先渲染图片图像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        // 隐藏文本头像
        $('.text-avatar').hide();
    } else {
        // 其次渲染文本头像
        $('.layui-nav-img').hide();
        var firstnm = name[0].toUpperCase();
        $('.text-avatar').html(firstnm).show();

    }
}

// 退出登录
function logout() {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        // 回到登录页
        location.href = '/login.html';
        // 清空token
        localStorage.removeItem('token');
        //关闭确认框
        layer.close(index);
    });
}