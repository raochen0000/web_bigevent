$(function () {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (val) {
            if (val === $('[name=oldPwd]').val()) return '新旧密码不能相同！';
        },
        rePdw: function (val) {
            if (val !== $('[name=newPwd]').val()) return '两次输入的新密码不一致！';
        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        // var data = $(this).serialize();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (result) {
                if (result.status !== 0) return layer.msg('更新密码失败！');
                // console.log(result);
                layer.msg('更新密码成功！');
                $('.layui-form')[0].reset();
            }
        })
    })
})