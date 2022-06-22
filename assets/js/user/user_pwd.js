$(function() {
    var form = layui.form;
    var layer = layui.layer;
    // 监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault(); //组织默认提交行为
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('重置密码失败！');
                }
                layer.msg('重置密码成功！');
                $('.layui-form')[0].reset(); //重置表单
            }
        });
    });
    // 表单验证
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            //新旧密码不能相同
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同!';
            }
        },
        rePwd: function(value) {
            //确认密码要一致
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致!';
            }
        }
    });
});