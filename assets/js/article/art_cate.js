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

    //监听添加按钮点击事件
    var indexAddCate = null;
    $('#btnAddCate').on('click', function() {
        indexAddCate = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    });

    //通过代理的形式绑定新增分类表单提交事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("新增分类失败");
                }

                getArtCateList();
                layer.msg("新增分类成功");
                layer.close(indexAddCate);
            }
        });
    });

    //通过代理的形式绑定编辑按钮点击事件
    var indexEditCate = null;
    $('tbody').on('click', '.btn-edit', function() {
        indexEditCate = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: $('#dialog-edit').html()
        });
    });
});