$(function () {
    var form = layui.form;
    var laypage = layui.laypage;
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    /* 获取文章列表 */
    initTableList();
    function initTableList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (result) {
                if (result.status !== 0) return layer.msg('获取文章列表失败！');
                var htmlStr = template('tpl-table', result);
                $('tbody').html(htmlStr);
                renderPage(result.total);
            }
        })
    }
    /* 获取筛选内容下拉列表 */
    initSelect()
    function initSelect() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (result) {
                var htmlStr = template('tpl-cate', result);
                $('[name="cate_id"]').html(htmlStr);
                form.render(); //让layui重新渲染表单结构
            }
        })
    }
    /* 筛选内容 */
    $('#form-search').on('submit', '#btn-select', function (e) {
        e.preventDefault();
        var cate_id = $('[name="cate_id"]').val();
        var cate_state = $('[name="state"]').val();
        q.cate_id = cate_id;
        q.state = cate_state;
        initTableList();
    })

    /* 渲染分页内容 */
    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'page-box', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发 jump 回调
            // 触发 jump 回调的方式有两种：
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function (obj, first) {
                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                q.pagesize = obj.limit
                // 根据最新的 q 获取对应的数据列表，并渲染表格
                if (!first) {
                    initTableList()
                }
            }
        })
    }

    $('tbody').on('click', '.btn-delete', function () {
        // 获取到文章的 id
        var id = $(this).attr('data-id')
        // 询问用户是否要删除数据
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    initTable()
                }
            })

            layer.close(index)
        })
    })

    /* 格式化日期 */
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
})