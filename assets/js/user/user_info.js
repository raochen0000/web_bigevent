$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (val) {
            if (val.length > 6) return '用户昵称不符合规则!';
        }
    })
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (result) {
                if (result.status !== 0) return layer.msg('获取用户信息失败！');
                form.val('formUserInfo', result.data);
            }
        })
    }
    /* 重置用户信息 */
    $('#reset').click(function (e) {
        e.preventDefault();
        initUserInfo();
    })
    /* 提交修改的用户信息 */
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (result) {
                if (result.status !== 0) return layer.msg('更新用户信息失败！');
                layer.msg('更新用户信息成功！');
                console.log(11);
                window.parent.getUserInfo();
                console.log(22);
            }
        })
    })
})