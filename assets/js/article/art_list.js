$(function() {
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '' //文章的状态
    }

    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    getArtList();
    getArtCateList();
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
                // console.log(res);
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);

                // 渲染分页
                renderPage(res.total);
            }
        });
    }

    // 注册时间格式化过滤器
    template.defaults.imports.dateFormat = function(date) {
        const dt = new Date(date);
        var year = dt.getFullYear();
        var month = padZreo(dt.getMonth());
        var day = padZreo(dt.getDate());

        var hh = padZreo(dt.getHours());
        var mi = padZreo(dt.getMinutes());
        var ss = padZreo(dt.getMinutes());

        return year + '-' + month + '-' + day + ' ' + hh + ':' + mi + ':' + ss;
    }

    // 补零函数
    function padZreo(n) {
        return n > 9 ? n : '0' + n;
    }

    //获取文章分类列表并使用模板引擎渲染到筛选下拉框
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

    // 绑定筛选表单提交事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        //注册筛选条件
        q.cate_id = cate_id;
        q.state = state;
        //重新获取文章列表
        getArtList();

    });

    // 分页方法
    function renderPage(total) {
        laypage.render({
            elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页显示的条数
            curr: q.pagenum, //当前页
            jump: function(obj, first) {
                    console.log(first);
                    //obj包含了当前分页的所有参数，比如：
                    q.pagenum = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
                    if (!first) {
                        //重新发起请求
                        getArtList();
                    }

                }
                // layout: ['prev', 'page', 'next', 'limit']
        });
    }

});