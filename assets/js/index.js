$(function() {
    getUserInfo();
});

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        Headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            console.log(localStorage.getItem('token'));
            console.log(res);
        }
    });
}