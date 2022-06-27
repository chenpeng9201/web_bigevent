$(function() {
    var q = {
        pagenum: 1, //页码值
        pagesize: 5, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '' //文章的状态
    }

    var layer = layui.layer;

    getArtList();

    // 获取文章列表
    function getArtList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！');
                }
                //使用模板引擎渲染表格
                console.log(res);
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        });
    }
});