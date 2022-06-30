$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var state = '已发布';
    getArtCateList();
    // 初始化富文本编辑器
    initEditor();

    // 初始化文章类别下拉框
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
                var htmlStr = template('tpl-cate', res);
                // console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr); //填充模板
                form.render('select'); //重新渲染
            }
        });
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image');
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };
    // 3. 初始化裁剪区域
    $image.cropper(options);

    // 绑定选择文件按钮点击事件
    $('#chooseFile').on('click', function() {
        $('#coverFile').click();
    });

    // 监听文件选择框change事件
    $('#coverFile').on('change', function(e) {
        // console.log(e);
        var files = e.target.files;
        if (files.length === 0) {
            return;
        }
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    //监听存为草稿按钮点击事件
    $('#save2').on('click', function() {
        state = '草稿';
    });

    //监听表单提交
    $('#form-pub').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', state);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                //发布文章 
                fd.forEach(function(v, k) {
                    console.log(k + ':' + v);
                });
                pubArt(fd);
            });



    });

    // 发布文章
    function pubArt(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！');
                }
                layer.msg('发布文章成功！');
                location.href = '/article/art_list.html';
            }
        });
    }
});