$(function() {
    var layer = layui.layer;
    var form = layui.form;
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
        var id = $(this).attr('data-id');
        // 发送Ajax请求获取数据进行填充
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data);
            }
        });
    });

    // 通过代理给编辑框绑定表单提交事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新文章分类失败！');
                }
                layer.msg('更新文章分类成功！');
                getArtCateList();
                layer.close(indexEditCate);
            }
        });
    });

    // 通过代理给删除按钮绑定提交事件
    $('tbody').on('click', '.btn-del', function(e) {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！');
                    }
                    layer.msg('删除分类成功！');
                    layer.close(index);
                    getArtCateList();
                }
            });

        });
    });
});