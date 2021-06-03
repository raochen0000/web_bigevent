$(function () {
    var layer = layui.layer;
    var form = layui.form;
    initArtitclCate();
    /* 点击添加按钮弹出添加弹出层 */
    var indexAdd = null;
    $('#btn-addArticle').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    /* 给添加文章的弹出层绑定表单提交事件 */
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (result) {
                if (result.status !== 0) {
                    return layer.msg('添加失败！');
                }
                initArtitclCate();
                layer.close(indexAdd); //关闭弹出层
                layer.msg('添加成功！');
            }
        })
    })
    /* 点击编辑按钮弹出修改弹出层 */
    var indexEdit = null;
    $('tbody').on('click', '#btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        /* 将编辑按钮本行的数据渲染到表单 */
        var id = $(this).data('id');
        console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (result) {
                form.val('form-edit', result.data);
            }
        })
    })
    /* 提交修改后的信息 */
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (result) {
                if (result.status !== 0) return layer.msg('修改信息失败！');
                layer.close(indexEdit);
                layer.msg('修改信息成功！');
                initArtitclCate();
            }
        })
    })
    /* 删除当前行的信息 */
    $('tbody').on('click', '#btn-delete', function () {
        var id = $(this).data('id');
        layer.confirm(
            '确认删除？',
            { icon: 3, title: '提示' },
            function () {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + id,
                    success: function (result) {
                        if (result.status !== 0) return layer.msg('删除失败！');
                        layer.msg('删除成功！');
                        initArtitclCate();
                    }
                })
            }
        )
    })
    /* 初始化文章列表 */
    function initArtitclCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (result) {
                var htmlStr = template('tpl_artCate', result);
                $('tbody').html(htmlStr);
            }
        })
    }
})