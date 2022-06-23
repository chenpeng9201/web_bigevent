$(function() {
    var layer = layui.layer;
    getArtCateList();
    //获取文章分类列表
    function getArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败！');
                }
                // console.log(res);
                // 通过模板引擎进行渲染
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr); //渲染
            }
        });
    }
});